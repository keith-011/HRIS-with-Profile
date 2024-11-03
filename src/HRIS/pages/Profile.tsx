import React from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/content/PageHeader";
import MainProfile from "../../Shared/components/Cards/MainProfileCard";
import ProfileDetails from "../../Shared/components/Cards/ProfileDetailsCards";

const Profile = () => {
  // const { id } = useParams<{ id: string }>();

  const breadcrumbs = [
    { text: "Employees", link: "/employees" },
    { text: "Profile", link: "/profile" },
  ];

  // Separate constants for each section
  const mainProfile = {
    joinedDate: "2022-01-15",
    reportsTo: "Jane Smith",
  };

  const accountInfo = {
    accessLevel: "Admin",
    employmentStatus: "Active",
    employeeId: "978465",
    email: "johndoeee@example.com",
  };

  const contactInfo = {
    phoneNumber1: "09123456789",
    phoneNumber2: "09987654321",
    presentAddress: "1234 Gumamela Street, Manuyo Dos, Las Piñas City",
    permanentAddress: "same as current address",
  };

  const personalInfo = {
    employeeName: "John Doe",
    birthday: "1990-05-10",
    gender: "Male",
    nationality: "Filipino",
    maritalStatus: "Single",
  };

  const governmentNumbers = {
    sss: "12-3456789-12",
    birTin: "123-456-789",
    gsis: "1234567890",
    pagibig: "1234-5678-9012",
    philhealth: "12-123456789-1",
  };

  const employmentDetails = {
    plantillaPosition: "Assistant Professor I",
    salaryGrade: "2",
    employeeStatus: "Casual",
    civilServiceEligibility: "Licensure Examination for Teachers",
    dailyRate: "650",
    supervisor: "Jane E. Doe",
  };

  const employmentRole = {
    department: "General Education Department",
    category: "Teaching (Part-Time)",
    adminFunction: "with Admin Function",
  };

  const educationalAttainment = {
    schoolName: "Polytechnic University of the Philippines (Sta.Mesa)",
    program: "Bachelor of Science in Computer Science",
    yearStarted: "2015",
    yearGraduated: "2019"
  };

  return (
    <>
      <PageHeader header="Profile" breadcrumbs={breadcrumbs} />
      <div className="flex flex-col gap-6">
        <MainProfile
          employeeImagePath="/src/assets/images/Avatar.png"
          leftContent={[
            {
              value1: personalInfo.employeeName,
              largeText: true,
              semibold: true,
            },
            { value1: employmentDetails.plantillaPosition },
            { value1: employmentRole.department },
            {
              field1: "Employee ID: ",
              value1: accountInfo.employeeId,
              semibold: true,
            },
            { field1: "Joined Date: ", value1: mainProfile.joinedDate },
          ]}
          rightContent={[
            { field2: "Phone", value2: contactInfo.phoneNumber1 },
            { value2: contactInfo.phoneNumber2 },
            { field2: "Email", value2: accountInfo.email },
            { field2: "Birthday", value2: personalInfo.birthday },
            { field2: "Address", value2: contactInfo.presentAddress },
            { field2: "Gender", value2: personalInfo.gender },
            { field2: "Reports to", value2: mainProfile.reportsTo },
          ]}
          employmentStatus={accountInfo.employmentStatus}
        />
        <div className="flex flex-col gap-6 md:flex-row md:gap-6">
          <ProfileDetails
            header="Account Information"
            details={[
              { field: "Access Level", value: accountInfo.accessLevel },
              {
                field: "Employment Status",
                value: accountInfo.employmentStatus,
              },
              { field: "Employee ID", value: accountInfo.employeeId },
              { field: "Email", value: accountInfo.email },
            ]}
          />
          <ProfileDetails
            header="Address & Contact Information"
            details={[
              { field: "Primary Phone", value: contactInfo.phoneNumber1 },
              { field: "Secondary Phone", value: contactInfo.phoneNumber2 },
              { field: "Present Address", value: contactInfo.presentAddress },
              {
                field: "Permanent Address",
                value: contactInfo.permanentAddress,
              },
            ]}
          />
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:gap-6">
          <ProfileDetails
            header="Personal Information"
            details={[
              { field: "Employee Name", value: personalInfo.employeeName },
              { field: "Birthday", value: personalInfo.birthday },
              { field: "Gender", value: personalInfo.gender },
              { field: "Nationality", value: personalInfo.nationality },
              { field: "Marital Status", value: personalInfo.maritalStatus },
            ]}
          />
          <ProfileDetails
            header="Government Numbers"
            details={[
              { field: "SSS", value: governmentNumbers.sss },
              { field: "BIR TIN", value: governmentNumbers.birTin },
              { field: "GSIS", value: governmentNumbers.gsis },
              { field: "Pag-IBIG", value: governmentNumbers.pagibig },
              { field: "PhilHealth", value: governmentNumbers.philhealth },
            ]}
          />
        </div>
        <div className="flex flex-col gap-6 md:flex-row md:gap-6">  
        <div>
          <ProfileDetails
            header="Employment Details"
            details={[
              { field: "Position", value: employmentDetails.plantillaPosition },
              { field: "Salary Grade", value: employmentDetails.salaryGrade },
              {
                field: "Employee Status",
                value: employmentDetails.employeeStatus,
              },
              {
                field: "Civil Service Eligibility",
                value: employmentDetails.civilServiceEligibility,
              },
              { field: "Daily Rate", value: employmentDetails.dailyRate },
              { field: "Supervisor", value: employmentDetails.supervisor },
            ]}
          />
          <ProfileDetails
            header="Employee Role"
            details={[
              { field: "Department", value: employmentRole.department },
              { field: "Category", value: employmentRole.category },
              { value: employmentRole.adminFunction },
            ]}
          />
        </div>
        <ProfileDetails
            header="Educational Attainment"
            details={[
              { field: "Civil Service Eligibility", value: employmentDetails.civilServiceEligibility}
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
