const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type PersonalInformation {
    id: ID!
    firstName: String
    lastName: String
    middleName: String
    dateOfBirth: Date
    age: Int
    ssn: String
    dlOrIdNumber: String
    stateIssued: String
    revokedOrSuspendedDate: Date
    address: String
    cityStateZip: String
    homePhone: String
    workPhone: String
    gender: String
    race: String
    nationality: String
    maritalStatus: String
    usCitizen: Boolean
    residencyNumber: String
    primaryLanguageSpoken: String
    referredBy: String
  }

  type MedicalInformation {
    id: ID!
    healthCareProvider: String
    terminalIllnesses: [String]
    currentMedications: [Medication]
  }

  type Medication {
    name: String
    dosage: String
    frequency: String
  }
  type IncarcerationDetails {
    dateOfIncarceration: Date
    charge: String
    location: String
  }

  type ProbationOfficerDetails {
    name: String
    contact: String
  }

  input MedicationInput {
    name: String
    dosage: String
    frequency: String
  }

  input IncarcerationDetailsInput {
    dateOfIncarceration: String
    charge: String
    location: String
  }

  input ProbationOfficerDetailsInput {
    name: String
    contact: String
  }

  type History {
    id: ID!
    criminalHistory: String
    physicalHealthHistory: String
    mentalHealthHistory: String
    familyHealthHistory: String
    incarcerationDetails: IncarcerationDetails
    upcomingCourtDates: [String]
    probationOfficerDetails: ProbationOfficerDetails
    alcoholOrDrugUse: Boolean
    preferredSubstance: String
    lastUsed: String
  }
  

  type Education {
    id: ID!
    highestLevelCompleted: String
    lastSchoolAttended: String
    yearGraduated: String
    collegeHoursCompleted: Int
    degree: String
  }
  

  type Employment {
    id: ID!
    currentEmployer: String
    position: String
    startDate: Date
    endDate: Date
    reasonForLeaving: String
    employmentType: String
    hourlyIncome: Float
    paymentFrequency: String
    specialSkills: [String]
  }
  

  type AgreementAcknowledgement {
    id: ID!
    acknowledgedAt: Date
    acknowledgedBy: String
    # Add additional fields as needed
    studentSignature: String
    witnessSignature: String
  }
  type User {
    id: ID!
    email: String!
    name: String
    username: String
    profilePicture: String
    bio: String
    createdAt: Date
    updatedAt: Date
    roles: [String]
    phoneNumber: String
    social: SocialMediaLinks
    address: Address
    settings: UserSettings
  }
  
  type SocialMediaLinks {
    facebook: String
    twitter: String
    instagram: String
    linkedIn: String
  }
  
  type Address {
    street: String
    city: String
    state: String
    postalCode: String
    country: String
  }

  type PrivacySettings {
    profileVisibleTo: String
    showActivityStatus: Boolean
    allowFriendRequests: Boolean
    shareLocation: Boolean
  }
  
  type UserSettings {
    darkMode: Boolean
    emailNotifications: Boolean
    smsNotifications: Boolean
    language: String
    privacy: PrivacySettings
    notificationFrequency: String
    themeColor: String
    twoFactorAuthentication: Boolean
    accountVisibility: String
    receiveNewsletter: Boolean
    textSize: String
    autoplayVideos: Boolean
    soundEffects: Boolean
  }

  type AuthPayload {
    token: String
    user: User
  }  

  type Query {
    personalInformations: [PersonalInformation]
    medicalInformations: [MedicalInformation]
    histories: [History]
    educations: [Education]
    employments: [Employment]
    agreementAcknowledgements: [AgreementAcknowledgement]
    personalInformation(id: ID!): PersonalInformation
    medicalInformation(id: ID!): MedicalInformation
    history(id: ID!): History
    education(id: ID!): Education
    employment(id: ID!): Employment
    agreementAcknowledgement(id: ID!): AgreementAcknowledgement
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    signup(email: String!, password: String!, name: String!, username: String!): AuthPayload

    createPersonalInformation(firstName: String!, lastName: String!): PersonalInformation
    updatePersonalInformation(id: ID!, firstName: String, lastName: String): PersonalInformation
    deletePersonalInformation(id: ID!): PersonalInformation
  
    createMedicalInformation(healthCareProvider: String!, terminalIllnesses: [String], currentMedications: [MedicationInput]): MedicalInformation
    updateMedicalInformation(id: ID!, healthCareProvider: String, terminalIllnesses: [String], currentMedications: [MedicationInput]): MedicalInformation
    deleteMedicalInformation(id: ID!): MedicalInformation
  
    createHistory(criminalHistory: String, physicalHealthHistory: String, mentalHealthHistory: String, familyHealthHistory: String, incarcerationDetails: IncarcerationDetailsInput, upcomingCourtDates: [String], probationOfficerDetails: ProbationOfficerDetailsInput, alcoholOrDrugUse: Boolean, preferredSubstance: String, lastUsed: String): History
    updateHistory(id: ID!, criminalHistory: String, physicalHealthHistory: String, mentalHealthHistory: String, familyHealthHistory: String, incarcerationDetails: IncarcerationDetailsInput, upcomingCourtDates: [String], probationOfficerDetails: ProbationOfficerDetailsInput, alcoholOrDrugUse: Boolean, preferredSubstance: String, lastUsed: String): History
    deleteHistory(id: ID!): History
  
    createEducation(highestLevelCompleted: String, lastSchoolAttended: String, yearGraduated: String, collegeHoursCompleted: Int, degree: String): Education
    updateEducation(id: ID!, highestLevelCompleted: String, lastSchoolAttended: String, yearGraduated: String, collegeHoursCompleted: Int, degree: String): Education
    deleteEducation(id: ID!): Education
  
    createEmployment(currentEmployer: String, position: String, startDate: Date, endDate: Date, reasonForLeaving: String, employmentType: String, hourlyIncome: Float, paymentFrequency: String, specialSkills: [String]): Employment
    updateEmployment(id: ID!, currentEmployer: String, position: String, startDate: Date, endDate: Date, reasonForLeaving: String, employmentType: String, hourlyIncome: Float, paymentFrequency: String, specialSkills: [String]): Employment
    deleteEmployment(id: ID!): Employment
  
    createAgreementAcknowledgement(acknowledgedAt: Date, acknowledgedBy: String, studentSignature: String, witnessSignature: String): AgreementAcknowledgement
    updateAgreementAcknowledgement(id: ID!, acknowledgedAt: Date, acknowledgedBy: String, studentSignature: String, witnessSignature: String): AgreementAcknowledgement
    deleteAgreementAcknowledgement(id: ID!): AgreementAcknowledgement
  }  
`;
module.exports = typeDefs;
