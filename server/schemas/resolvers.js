const PersonalInformation = require('../api/models/schemas/PersonalInformation');
const MedicalInformation = require('../api/models/schemas/MedicalInformation');
const History = require('../api/models/schemas/History');
const Education = require('../api/models/schemas/Education');
const Employment = require('../api/models/schemas/Employment');
const AgreementAcknowledgement = require('../api/models/schemas/AgreementAcknowledgement');
const User = require('../api/models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const sanitize = (input) => {
  // Remove HTML tags from the input string
  const sanitizedInput = input.replace(/<[^>]*>?/gm, '');
  return sanitizedInput;
};

const formatInputForModel = (input) => {
    // Handle date fields
    const dateFields = ['dateOfBirth', 'revokedOrSuspendedDate', 'startDate', 'endDate', 'acknowledgedAt', 'lastUsed', 'dateOfIncarceration'];
    dateFields.forEach(field => {
      if (input[field]) {
        input[field] = new Date(input[field]);
      }
    });
  
    // Handle nested 'incarcerationDetails' object
    if (input.incarcerationDetails && input.incarcerationDetails.dateOfIncarceration) {
      input.incarcerationDetails.dateOfIncarceration = new Date(input.incarcerationDetails.dateOfIncarceration);
    }
  
    // Handle 'currentMedications' array of objects
    if (input.currentMedications && Array.isArray(input.currentMedications)) {
      input.currentMedications = input.currentMedications.map(medication => {
        if (medication.datePrescribed) {
          medication.datePrescribed = new Date(medication.datePrescribed);
        }
        return medication;
      });
    }
  
    // Handle 'probationOfficerDetails' nested object
    if (input.probationOfficerDetails) {
      if (input.probationOfficerDetails.name) {
        input.probationOfficerDetails.name = input.probationOfficerDetails.name.trim();
      }
      if (input.probationOfficerDetails.contact) {
        input.probationOfficerDetails.contact = input.probationOfficerDetails.contact.trim();
      }
    }
  
    // Handle arrays of strings (e.g., 'terminalIllnesses', 'upcomingCourtDates')
    const arrayStringFields = ['terminalIllnesses', 'upcomingCourtDates', 'specialSkills'];
    arrayStringFields.forEach(field => {
      if (input[field] && Array.isArray(input[field])) {
        input[field] = input[field].map(item => item.trim()); // Trim each string in the array
      }
    });
  
    // Handle boolean conversions if necessary
    if (input.usCitizen !== undefined) {
      input.usCitizen = input.usCitizen === 'true';
    }

// Handle numerical conversions if necessary
const numericFields = ['age', 'collegeHoursCompleted', 'hourlyIncome'];
numericFields.forEach(field => {
  if (input[field] !== undefined && !isNaN(Number(input[field]))) {
    input[field] = Number(input[field]);
  }
});


// Sanitize text fields to prevent injection attacks
// Utilize a library like 'xss' or similar for sanitizing input
const sanitizeFields = ['firstName', 'lastName', 'address', 'currentEmployer', 'position', 'degree', 'charge', 'location'];
sanitizeFields.forEach(field => {
  if (input[field]) {
    // Assuming you have a sanitize function or library
    input[field] = sanitize(input[field]);
  }
});

// Handle complex nested structures or lists that require special attention
if (input.employmentHistory && Array.isArray(input.employmentHistory)) {
  input.employmentHistory = input.employmentHistory.map(job => {
    if (job.startDate) job.startDate = new Date(job.startDate);
    if (job.endDate) job.endDate = new Date(job.endDate);
    // Sanitize job details to prevent injection
    job.position = sanitize(job.position);
    job.currentEmployer = sanitize(job.currentEmployer);
    return job;
  });
}

if (input.references && Array.isArray(input.references)) {
  input.references = input.references.map(ref => {
    ref.name = sanitize(ref.name);
    ref.contact = sanitize(ref.contact);
    // Add other necessary transformations
    return ref;
  });
}

// Handle enum fields to ensure they match predefined sets of values
const enumFields = {
    gender: ['Male', 'Female', 'Other'],
    maritalStatus: ['Single', 'Married', 'Divorced', 'Widowed'],
    employmentType: ['Full-time', 'Part-time', 'Self-employed', 'Unemployed']
  };
  
  Object.keys(enumFields).forEach(field => {
    if (input[field] && !enumFields[field].includes(input[field])) {
      throw new Error(`${field} must be one of the following values: ${enumFields[field].join(', ')}`);
    }
  });
  
  // Transform complex nested arrays, ensuring data integrity and structure
  if (input.projects && Array.isArray(input.projects)) {
    input.projects = input.projects.map(project => {
      project.title = sanitize(project.title);
      if (project.description) project.description = sanitize(project.description);
      if (project.startDate) project.startDate = new Date(project.startDate);
      if (project.endDate) project.endDate = new Date(project.endDate);
      // Ensure 'contributors' is an array and sanitize its contents
      if (project.contributors && Array.isArray(project.contributors)) {
        project.contributors = project.contributors.map(contributor => {
          contributor.name = sanitize(contributor.name);
          if (contributor.role) contributor.role = sanitize(contributor.role);
          return contributor;
        });
      }
      return project;
    });
  }
  
  // Additional data integrity checks
  if (input.phoneNumber && !/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/.test(input.phoneNumber)) {
    throw new Error('phoneNumber must follow the format +XXX-XXX-XXX-XXXX');
  }
  
  // Custom logic for specific fields or scenarios
  if (input.firstName && input.lastName) {
    input.fullName = `${input.firstName} ${input.lastName}`;
  }
  
  if (input.tags && Array.isArray(input.tags)) {
    input.tags = [...new Set(input.tags.map(tag => tag.trim()))];
  }
  
  return input;
  };
  

const resolvers = {
    Query: {


  users: async (_, args, { req }) => {
    // Check if the user is authenticated
    if (!req.user) throw new Error("Not authenticated");

    // If the user is an admin, return all users
    if (req.user.role === 'admin') {
      return await User.find({});
    } else {
      // If the user is not an admin, return only their own data
      return await User.find({ _id: req.user.id });
    }
  },
        myProtectedQuery: (parent, args, context) => {
            // Your resolver logic here
            // Make sure to check for authentication if it's a protected query
            if (!context.req.user) {
              throw new Error('Not authenticated');
            }
            return "This is a protected query response";
          },    

      
          personalInformation: async (_, { id }, { req }) => {
            try {
              const info = await PersonalInformation.findById(id);
              if (!info) {
                throw new Error("Personal information not found.");
              }
          
              // Check if userId exists before calling toString()
              if (!info.userId) {
                throw new Error("UserId is missing in the personal information.");
              }
          
              // Now that we've ensured info.userId exists, we can safely call toString()
              const userIdString = info.userId.toString();
          
              // You might want to convert the entire document, including converting _id to string
              return {
                ...info.toObject(),
                id: info._id.toString(), // Convert MongoDB ObjectId to String
                userId: userIdString,
                // Include other transformations if needed
              };
            } catch (error) {
              console.error("Error fetching personal information by ID:", error);
              throw new Error("Failed to fetch personal information.");
            }
          },             
          medicalInformations: async () => {
            try {
              const response = await fetch('http://localhost:3001/api/medicalInformation');
              if (!response.ok) {
                throw new Error('Failed to fetch medical information');
              }
              const medicalInformations = await response.json();
              return medicalInformations.map(info => ({
                ...info,
                id: info._id, // Assuming MongoDB is used; adapt as needed
                // Ensure the structure matches what your GraphQL query expects
                // For example, if terminalIllnesses is an array in your REST API,
                // no change is needed. If it's a string or another format, you might need to adapt it.
                currentMedications: info.currentMedications // Assuming this is already an array of objects as your GraphQL schema expects
              }));
            } catch (error) {
              console.error('Error fetching medical information:', error);
              throw new Error('Error fetching medical information');
            }
          },
          histories: async (_, __, { req }) => {
            try {
              const response = await fetch(`http://localhost:3001/api/history`, {
                headers: {
                  Authorization: req.headers.authorization
                }
              });
              if (!response.ok) {
                throw new Error('Failed to fetch histories');
              }
              const histories = await response.json();
              return histories.map(history => ({
                ...history,
                id: history._id || 'fallback-id', // Map _id to id and provide a fallback if null
              }));
            } catch (error) {
              console.error(error);
              throw new Error('Error fetching histories');
            }
          },          
          educations: async (_, __, { req }) => {
            try {
              const response = await fetch(`http://localhost:3001/api/education`, {
                headers: {
                  Authorization: req.headers.authorization
                }
              });
              if (!response.ok) {
                throw new Error('Failed to fetch educations');
              }
              const educations = await response.json();
              return educations.map(education => ({
                ...education,
                id: education._id, // Ensure each entity has an 'id' for GraphQL
              }));
            } catch (error) {
              console.error(error);
              throw new Error('Error fetching educations');
            }
          },
          
          employments: async (_, __, { req }) => {
            try {
              // Fetch employments belonging to the authenticated user from the API
              const response = await fetch(`http://localhost:3001/api/employment`, {
                headers: {
                  Authorization: req.headers.authorization // Pass the authorization header from the incoming request
                }
              });
              if (!response.ok) {
                throw new Error('Failed to fetch employments');
              }
              const employments = await response.json();
              return employments.map(employment => ({
                ...employment,
                id: employment._id, // Map MongoDB '_id' to GraphQL 'id'
                // Ensure all fields expected by your GraphQL schema are included and properly formatted
                // Example: Convert dates to your required format, ensure arrays are correctly structured, etc.
              }));
            } catch (error) {
              console.error(error);
              throw new Error('Error fetching employments');
            }
          },
          
          agreementAcknowledgements: async (_, __, { req }) => {
            try {
              // Fetch agreement acknowledgements belonging to the authenticated user from the API
              const response = await fetch(`http://localhost:3001/api/agreementAcknowledgement`, {
                headers: {
                  Authorization: req.headers.authorization // Pass the authorization header from the incoming request
                }
              });
              // Further implementation...
            } catch (error) {
              console.error(error);
              throw new Error('Error fetching agreement acknowledgements');
            }
          },
          
        // For queries fetching a single item by ID, ensure the item belongs to the user
        personalInformation: async (_, { id }, { req }) => {
          console.log("Requested ID:", id);
          const info = await PersonalInformation.findById(id);
          console.log("Retrieved info:", info);
          if (!info) throw new Error("Personal information not found.");
          return info; // Simplified return for testing
        },        
        medicalInformation: async (_, { id }, { user }) => {
          if (!user) throw new Error("Not authenticated");
          const info = await MedicalInformation.findById(id);
          if (!info || info.userId.toString() !== user.id) {
            throw new Error("Not authorized to access this information");
          }
          return info;
        },
        history: async (_, { id }, { user }) => {
          if (!user) throw new Error("Not authenticated");
          const info = await History.findById(id);
          if (!info || info.userId.toString() !== user.id) {
            throw new Error("Not authorized to access this information");
          }
          return info;
        },
        education: async (_, { id }, { user }) => {
          if (!user) throw new Error("Not authenticated");
          const info = await Education.findById(id);
          if (!info || info.userId.toString() !== user.id) {
            throw new Error("Not authorized to access this information");
          }
          return info;
        },
        employment: async (_, { id }, { user }) => {
          if (!user) throw new Error("Not authenticated");
          const info = await Employment.findById(id);
          if (!info || info.userId.toString() !== user.id) {
            throw new Error("Not authorized to access this information");
          }
          return info;
        },
        agreementAcknowledgement: async (_, { id }, { user }) => {
          if (!user) throw new Error("Not authenticated");
          const info = await AgreementAcknowledgement.findById(id);
          if (!info || info.userId.toString() !== user.id) {
            throw new Error("Not authorized to access this information");
          }
          return info;
        },
    },
  Mutation: {
    login: async (_, { email, password }) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error('User not found');
          }
          
          const isPasswordCorrect = await bcrypt.compare(password, user.password);
          if (!isPasswordCorrect) {
            throw new Error('Incorrect email or password');
          }
          
          const token = jwt.sign(
            { userId: user.id, role: user.isAdmin ? 'admin' : 'user' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
          );
          
          return { token, user };
        } catch (error) {
          console.error('Error during login', error);
          throw new Error('Login failed');
        }
      },
  
      signup: async (_, { email, password, name, username }) => {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists with that email');
        }
      
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
      
        try {
          let user = new User({
            email,
            password: hashedPassword,
            name,
            username,
          });
      
          // Log user object before saving for debugging
          console.log("Attempting to save user:", user);
      
          await user.save();
      
          // Generate JWT token for the new user
          const token = jwt.sign(
            { userId: user.id, role: user.role }, // Include the role in the JWT payload
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
          );
          
          console.log("User saved successfully:", user);
      
          return {
            token,
            user,
          };
        } catch (error) {
          console.error("Error saving user:", error);
          throw new Error('There was a problem creating the user.');
        }
      },

      updateUser: async (_, { id, input }, { req }) => {
        // Check if the user is authenticated
        if (!req.user) throw new Error("Not authenticated");
    
        // If the user is not an admin and trying to update someone else's data, throw an error
        if (req.user.role !== 'admin' && req.user.id !== id) {
          throw new Error("Not authorized to update this user's data");
        }
    
        // Proceed with the update
        return await User.findByIdAndUpdate(id, input, { new: true });
      },
        
      createPersonalInformation: async (_, { input }) => {
        try {
          const formattedInput = formatInputForModel(input); // Ensure input is properly formatted
          const newPersonalInformation = new PersonalInformation(formattedInput);
          const savedPersonalInformation = await newPersonalInformation.save();
          return savedPersonalInformation;
        } catch (error) {
          console.error("Error creating personal information:", error);
          throw new Error("Failed to create personal information.");
        }
      },
      
    updatePersonalInformation: async (_, { id, input }) => {
      const formattedInput = formatInputForModel(input);
      return await PersonalInformation.findByIdAndUpdate(id, formattedInput, { new: true });
    },
    deletePersonalInformation: async (_, { id }) => {
      const deleted = await PersonalInformation.findByIdAndDelete(id);
      return deleted ? true : false;
    },
 // MedicalInformation Mutations
 createMedicalInformation: async (_, { input }) => {
    const formattedInput = formatInputForModel(input);
    const newMedicalInformation = new MedicalInformation(formattedInput);
    return await newMedicalInformation.save();
  },
  updateMedicalInformation: async (_, { id, input }) => {
    const formattedInput = formatInputForModel(input);
    return await MedicalInformation.findByIdAndUpdate(id, formattedInput, { new: true });
  },
  deleteMedicalInformation: async (_, { id }) => await MedicalInformation.findByIdAndDelete(id),

  // History Mutations
  createHistory: async (_, { input }) => {
    const formattedInput = formatInputForModel(input);
    const newHistory = new History(formattedInput);
    return await newHistory.save();
  },
  updateHistory: async (_, { id, input }) => {
    const formattedInput = formatInputForModel(input);
    return await History.findByIdAndUpdate(id, formattedInput, { new: true });
  },
  deleteHistory: async (_, { id }) => await History.findByIdAndDelete(id),

  // Education Mutations
  createEducation: async (_, { input }) => {
    const formattedInput = formatInputForModel(input);
    const newEducation = new Education(formattedInput);
    return await newEducation.save();
  },
  updateEducation: async (_, { id, input }) => {
    const formattedInput = formatInputForModel(input);
    return await Education.findByIdAndUpdate(id, formattedInput, { new: true });
  },
  deleteEducation: async (_, { id }) => await Education.findByIdAndDelete(id),

  // Employment Mutations
  createEmployment: async (_, { input }) => {
    const formattedInput = formatInputForModel(input);
    const newEmployment = new Employment(formattedInput);
    return await newEmployment.save();
  },
  updateEmployment: async (_, { id, input }) => {
    const formattedInput = formatInputForModel(input);
    return await Employment.findByIdAndUpdate(id, formattedInput, { new: true });
  },
  deleteEmployment: async (_, { id }) => await Employment.findByIdAndDelete(id),

  // AgreementAcknowledgement Mutations
  createAgreementAcknowledgement: async (_, { input }) => {
    const formattedInput = formatInputForModel(input);
    const newAgreementAcknowledgement = new AgreementAcknowledgement(formattedInput);
    return await newAgreementAcknowledgement.save();
  },
  updateAgreementAcknowledgement: async (_, { id, input }) => {
    const formattedInput = formatInputForModel(input);
    return await AgreementAcknowledgement.findByIdAndUpdate(id, formattedInput, { new: true });
  },
  deleteAgreementAcknowledgement: async (_, { id }) => await AgreementAcknowledgement.findByIdAndDelete(id),
},

};

module.exports = resolvers;
