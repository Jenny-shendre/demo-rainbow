import { useEffect, useState, useRef } from "react";
import { LuPencilLine, LuEyeOff, LuEye } from "react-icons/lu";
import Searchsvg from "../../assets/material-symbols_search.svg";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { format } from "date-fns";
import Loding from "../Loding/Loding";
import "../Home.css";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaCircle } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import DropIcon from "../../assets/DropIcon.png";
import EmailIcon from "../../assets/email.png";
import PhoneIcon from "../../assets/phone.png";

const Table5 = () => {
  const [valueinput, setvalueinput] = useState("");
  const [viewedItems, setViewedItems] = useState([]);
  const [data, setdata] = useState([]);
  const [data1, setdata1] = useState([]);
  const [data2, setdata2] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [showTeamPopup, setShowTeamPopup] = useState(false);
  const [showAddTeamMemberPopup, setShowAddTeamMemberPopup] = useState(false);
  const [showAddManagerPopup, setShowAddManagerPopup] = useState(false);
  const [showAddExecutivePopup, setShowAddExecutivePopup] = useState(false); // state for executive popup
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false); // state for project dropdown

  const teamPopupRef = useRef();
  const addTeamMemberPopupRef = useRef();
  const addManagerPopupRef = useRef();
  const addExecutivePopupRef = useRef(); //  ref for executive popup
  const dropdownRef = useRef();
  const projectDropdownRef = useRef(); // ref for project dropdown

  const handleView = (id) => {
    if (viewedItems.includes(id)) {
      setViewedItems((prevViewedItems) =>
        prevViewedItems.filter((item) => item !== id)
      );
    } else {
      setViewedItems((prevViewedItems) => [...prevViewedItems, id]);
    }
  };



  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get(
      "https://project-rof.vercel.app/api/salesManager/fetch-all"
    );
    setdata(res.data);

    const res1 = await axios.get(
      "https://project-rof.vercel.app/api/teams/fetch-all"
    );
    setdata1(res1.data);

    const res2 = await axios.get(
      "https://project-rof.vercel.app/api/projects"
    );
    setdata2(res2.data);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log("data", data);
  // console.log("data1", data1);
  // console.log("data2", data2)

  // const DateupdatedAt = (DateupdatedAt) => {
  //   const formattedDate = format(new Date(DateupdatedAt), "dd MMM | hh:mm a");
  //   return formattedDate;
  // };

  // const ResponseAt = (DateupdatedAt) => {
  //   const formattedDate = format(new Date(DateupdatedAt), "hh:mm a");
  //   return formattedDate;
  // };

  const getTeamName = (index) => {
    const teamLetter = String.fromCharCode(65 + index);
    return `Team ${teamLetter}`;
  };

  const handleOutsideClick = (event) => {
    if (
      teamPopupRef.current &&
      !teamPopupRef.current.contains(event.target)
    ) {
      setShowTeamPopup(false);
    }
    if (
      addTeamMemberPopupRef.current &&
      !addTeamMemberPopupRef.current.contains(event.target)
    ) {
      setShowAddTeamMemberPopup(false);
    }
    if (
      addManagerPopupRef.current &&
      !addManagerPopupRef.current.contains(event.target)
    ) {
      setShowAddManagerPopup(false);
    }
    if (
      addExecutivePopupRef.current &&
      !addExecutivePopupRef.current.contains(event.target)
    ) {
      setShowAddExecutivePopup(false);
    }
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
    if (
      projectDropdownRef.current &&
      !projectDropdownRef.current.contains(event.target)
    ) {
      setIsProjectDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (showTeamPopup || showAddTeamMemberPopup || showAddManagerPopup || showAddExecutivePopup || isDropdownOpen || isProjectDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showTeamPopup, showAddTeamMemberPopup, showAddManagerPopup, showAddExecutivePopup, isDropdownOpen, isProjectDropdownOpen]);

  // Add team members popup logic

  const [teamName, setTeamName] = useState('');
  const [project, setProject] = useState('');
  const [manager, setManager] = useState('');
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [createStatus, setCreateStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // state for error message

  const handleAddMember = () => {
    if (newMember.trim() && !members.includes(newMember.trim())) {
      setMembers([...members, newMember.trim()]);
      setNewMember('');
    }
  };

  const handleRemoveMember = (member) => {
    setMembers(members.filter((m) => m !== member));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddMember();
    }
  };

  const handleProjectChange = (projectName) => {
    setProject(projectName);
    setIsProjectDropdownOpen(false);
  };

  const handleManagerChange = (managerName) => {
    setManager(managerName);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async () => {
    if (teamName && project && manager && members.length > 0) {
      setIsCreating(true);
      setErrorMessage(''); // Clear any previous error messages

      const teamdata = {
        teamName: teamName,
        projectName: project,
        managerName: manager,
        teamMemberName: members
      }

      try {
        const res = await axios.post('https://project-rof.vercel.app/api/teams/save', teamdata);
        console.log("res", res);
        setCreateStatus('Team Created Successfully ✓');
        console.log("Response send", teamdata);
      } catch (error) {
        console.error('Error creating team:', error);
        setCreateStatus('Error Creating Team');
      } finally {
        setIsCreating(false);
      }
    } else {
      setErrorMessage('Please fill in all fields and add at least one team member.');
    }
  };

  //  manager popup logic

  const [managerName, setManagerName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [managerPhone, setManagerPhone] = useState(''); // state for phone number
  const [isManagerCreating, setIsManagerCreating] = useState(false);
  const [managerCreateStatus, setManagerCreateStatus] = useState('');
  const [managerErrorMessage, setManagerErrorMessage] = useState(''); // state for error message

  const validateManagerName = (name) => {
    return /^[A-Z][a-zA-Z]*$/.test(name);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhoneNumber = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const handleManagerPhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length <= 10) {
      setManagerPhone(value);
    }
  };

  const handleManagerSubmit = async () => {
    if (managerName && managerEmail && managerPhone) { // Check for phone number
      if (!validateManagerName(managerName)) {
        setManagerErrorMessage('The first letter of the name must be capital.');
        return;
      }
      if (!validateEmail(managerEmail)) {
        setManagerErrorMessage('Please enter a valid email address.');
        return;
      }
      if (!validatePhoneNumber(managerPhone)) {
        setManagerErrorMessage('Phone number must be exactly 10 digits.');
        return;
      }
      setIsManagerCreating(true);
      setManagerErrorMessage(''); // Clear any previous error messages

      const managerData = {
        name: managerName,
        email: managerEmail,
        phone: managerPhone
      }
      try {
        const res = await axios.post("https://project-rof.vercel.app/api/salesManager/save", managerData)
        console.log("res", res);
        setManagerCreateStatus('Manager Created Successfully ✓');
        console.log("Response send", res);
      } catch (error) {
        console.error('Error creating manager:', error);
        setManagerCreateStatus('Error Creating Manager');
        console.log(error);
      } finally {
        setIsManagerCreating(false);
      }
    } else {
      setManagerErrorMessage('Please fill in all fields.');
    }
  };

  //  executive popup logic

  const [executiveName, setExecutiveName] = useState('');
  const [executiveEmail, setExecutiveEmail] = useState('');
  const [executivePhone, setExecutivePhone] = useState(''); // state for phone number
  const [isExecutiveCreating, setIsExecutiveCreating] = useState(false);
  const [executiveCreateStatus, setExecutiveCreateStatus] = useState('');
  const [executiveErrorMessage, setExecutiveErrorMessage] = useState(''); //  state for error message

  const handleExecutivePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length <= 10) {
      setExecutivePhone(value);
    }
  };

  const handleExecutiveSubmit = async () => {
    if (executiveName && executiveEmail && executivePhone) { // Check for phone number
      if (!validateManagerName(executiveName)) {
        setExecutiveErrorMessage('The first letter of the name must be capital.');
        return;
      }
      if (!validateEmail(executiveEmail)) {
        setExecutiveErrorMessage('Please enter a valid email address.');
        return;
      }
      if (!validatePhoneNumber(executivePhone)) {
        setExecutiveErrorMessage('Phone number must be exactly 10 digits.');
        return;
      }
      setIsExecutiveCreating(true);
      setExecutiveErrorMessage(''); // Clear any previous error messages

      const executiveData = {
        name: executiveName,
        emailID: executiveEmail,
        phone: executivePhone
      }

      try {
        const res = await axios.post("https://project-rof.vercel.app/api/attendants/save", executiveData)
        console.log("res", res);
        setExecutiveCreateStatus('Executive Created Successfully ✓');
        console.log("Response send", res);
      } catch (error) {
        console.error('Error creating executive:', error);
        setExecutiveCreateStatus('Error Creating Executive');
      } finally {
        setIsExecutiveCreating(false);
      }
    } else {
      setExecutiveErrorMessage('Please fill in all fields.');
    }
  };

  return (
    <div className="arrowss">
      {loading ? (
        <Loding />
      ) : (
        <div
          style={{ gap: "10px" }}
          className="Tab3 p-4 overflow-x-auto flex flex-col gap-9 bg-custom-bg h-screen"
        >
          <div
            style={{ gap: "20px", paddingLeft: "0px" }}
            className="p-4 overflow-x-auto flex flex-col gap-9 bg-custom-bg"
          >
            <h1
              className="font-bold flex items-center gap-1"
              style={{
                fontFamily: "Poppins",
                fontSize: "24px",
                fontWeight: "500",
              }}
            >
              Home
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <span
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  fontSize: "24px",
                }}
                className="font-medium"
              >
                Team
              </span>
            </h1>

            <div className="flex flex-row items-center justify-center text-center">
              <div className="flex justify-start items-center w-[50%] lg:block relative lg:w-[36rem] rounded-full">
                <input
                  className="w-full py-2 px-12 rounded-full"
                  style={{
                    border: "1px solid #3D2314",
                    boxShadow: " 0px 0px 4px 0px #00000040",
                  }}
                  type="text"
                  value={valueinput}
                  onChange={(e) => setvalueinput(e.target.value)}
                  placeholder="Search"
                />
                <img
                  style={{ top: "0.6rem" }}
                  src={Searchsvg}
                  alt="Search"
                  className="absolute left-4"
                />
              </div>
              <button
                onClick={() => setShowTeamPopup(!showTeamPopup)}
                className="add-team-button bg-[#3D2314] text-white px-4 py-2 rounded-full flex items-center justify-center h-[48px] ml-4 mt-4 lg:mt-0"
                style={{
                  height: "48px",
                  width: "120px",
                  border: "1px solid #3D2314",
                  boxShadow: "0px 0px 4px 0px #00000040",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add
              </button>
              {/* Add teams buttons */}
              {showTeamPopup && (
                <>
                  <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
                  <div
                    ref={teamPopupRef}
                    className="ml-[594px] mt-[190px] team-creation-popup w-[125px] h-[117px] rounded-[4px] bg-white absolute z-50 flex flex-col justify-between"
                  >
                    <button
                      className="w-[125px] button-hover h-[39px] p-[10px] text-left flex items-center font-manrope text-[16px] font-[400]"
                      onClick={() => {
                        setShowTeamPopup(false);
                        setShowAddTeamMemberPopup(true);
                      }}
                    >
                      Add Team
                    </button>
                    <button
                      className="w-[125px] button-hover h-[39px] p-[10px] text-left flex items-center font-manrope text-[16px] font-[400]"
                      onClick={() => {
                        setShowTeamPopup(false);
                        setShowAddManagerPopup(true);
                      }}
                    >
                      Add Manager
                    </button>
                    <button
                      className="w-[125px] button-hover h-[39px] p-[10px] text-left flex items-center font-manrope text-[16px] font-[400]"
                      onClick={() => {
                        setShowTeamPopup(false);
                        setShowAddExecutivePopup(true);
                      }}
                    >
                      Add Executive
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="outer-wrapper text-center flex items-center justify-center">
            <div className="table-wrapper" style={{ width: "999px" }}>
              {data.length !== 0 ? (
                <table
                  className="min-w-full bg-white"
                  style={{
                    boxShadow: " 0px 0px 4px 0px #00000040",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr className="text-[9px] lg:text-[15px] text-left bg-[#E8E8E8]">
                      <th
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          paddingLeft: "10px",
                          width: "65px",
                          padding: "10px",
                          border: "1px solid #ddd",
                          justifyContent: "center",
                        }}
                      >
                        Teams
                      </th>
                      <th
                        className="text-center"
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          padding: "5px",
                          width: "180px",
                          border: "1px solid #ddd",
                        }}
                      >
                        Manager Name
                      </th>
                      <th
                        className="border-b text-center"
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          padding: "5px",
                          width: "253px",
                          border: "1px solid #ddd",
                        }}
                      >
                        Manager Email ID
                      </th>
                      <th
                        className="border-b text-center"
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          width: "253px",
                          border: "1px solid #ddd",
                        }}
                      >
                        Current Project
                      </th>
                      <th
                        className="border-b text-center "
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "16.39px",
                          textAlign: "center",
                          padding: "5px",
                          width: "44px",
                          height: "16px",
                          justifyItems: "center",
                          alignItems: "center",
                          border: "1px solid #ddd",
                        }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data1.filter(({ teamName, managerName }) =>
                      teamName.toLowerCase().includes(valueinput.toLowerCase()) ||
                      managerName.toLowerCase().includes(valueinput.toLowerCase())
                    ).map((visitor, index) => (
                      <tr
                        key={index}
                        className="border-b text-[9px] lg:text-[14px]"
                      >
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #ddd",
                            width: "188px",
                            height: "54px",
                          }}
                        >
                          <div
                            className="py-3 text-center flex items-center "
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {visitor.teamName}
                          </div>
                        </td>

                        <td
                          className="py-3 border-b text-center"
                          style={{
                            textAlign: "center",
                            border: "1px solid #ddd",
                            padding: "10px",
                            width: "178px",
                            height: "54px",
                          }}
                        >
                          {visitor.managerName}
                        </td>

                        <td
                          className=" py-3 border-b text-center"
                          style={{
                            border: "1px solid #ddd",
                            padding: "10px",
                            width: "224px",
                            height: "54px",
                          }}
                        >
                          {visitor.managerEmail}
                        </td>

                        <td
                          className="  py-3 border-b text-center"
                          style={{
                            border: "1px solid #ddd",
                            padding: "10px",
                            width: "174px",
                            height: "54px",
                          }}
                        >
                          {visitor.projectName}
                        </td>

                        <td
                          className="  py-3 border-b text-center"
                          style={{
                            border: "1px solid #ddd",
                            padding: "10px",
                            width: "118px",
                            height: "54px",
                            justifyItems: "center",
                          }}
                        >
                          <div
                            className="py-3  flex gap-5 "
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <LuEye
                              style={{
                                cursor: "pointer",
                                fontSize: "18px",
                                color: "#632E04",
                              }}
                            />
                            <Link to={`/Team/${visitor.teamName}`}
                            >
                              <IoOpenOutline
                                onClick={() => deletedAt(visitor._id, visitor.customerId)}
                                style={{
                                  cursor: "pointer",
                                  fontSize: "18px",
                                  color: "#632E04",
                                }}
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No records found...!</p>
              )}
            </div>
          </div>

          {/* Add team member screen */}
          {showAddTeamMemberPopup && (
            <>
              <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
              <div
                ref={addTeamMemberPopupRef}
                className="fixed inset-0 flex items-center justify-center z-50"

              >
                <div className="add-team-members w-[488px] h-fit p-6 rounded-lg bg-white shadow-lg flex flex-col items-center">
                  <button
                    className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[485px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
                    onClick={() => setShowAddTeamMemberPopup(false)}
                  >
                    X
                  </button>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-[440px] h-12 p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal mb-4"
                    placeholder="Team Name"
                  />
                  <div
                    className="relative w-[440px] h-12 rounded-md border border-gray-300 font-manrope text-lg font-normal mb-4 block shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                    onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                    ref={projectDropdownRef}
                  >
                    <div className="cursor-pointer w-full h-full p-4 flex justify-between items-center">
                      {project || "Assign Project"}
                      <img className="ml-2 h-2 w-3 " src={DropIcon} alt="Dropdown Icon" />
                    </div>
                    {isProjectDropdownOpen && (
                      <div className="absolute z-10 mt-2 w-full p-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-52 overflow-y-auto">
                        {data2.map((projects) => (
                          <div
                            key={projects.name}

                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleProjectChange(projects.name)}
                          >
                            {projects.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    className="relative w-[440px] h-12 rounded-md border border-gray-300 font-manrope text-lg font-normal mb-4 block shadow-sm focus:border-brown-500 focus:ring focus:ring-brown-500 focus:ring-opacity-50"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="cursor-pointer w-full h-full p-4 flex justify-between items-center">
                      {manager || "Assign Manager"}
                      <img className="ml-2 h-2 w-3 " src={DropIcon} alt="Dropdown Icon" />
                    </div>
                    {isDropdownOpen && (
                      <div className="absolute z-10 mt-2 w-full p-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-52 overflow-y-auto">
                        {data.map((sales) => (
                          <div
                            key={sales.name}

                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleManagerChange(sales.name)}
                          >
                            {sales.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="w-[440px] h-[127px] p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal mb-4 overflow-y-auto">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {members.map((member, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-white px-2 py-1 rounded-md border border-gray-300"
                        >
                          <button
                            onClick={() => handleRemoveMember(member)}
                            className="text-black text-[22px]"
                          >
                            &times;
                          </button>
                          <span className="ml-2 ">{member}</span>

                        </div>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={newMember}
                      onChange={(e) => setNewMember(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="add-member"
                      placeholder="Add Team Member"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-fit create-team-btn h-12 p-3 bg-[#3D2314] rounded-md text-center font-manrope text-lg font-medium text-white"
                    disabled={isCreating}
                  >
                    {createStatus || 'Create Team'}
                  </button>
                  {errorMessage && (
                    <p className="text-red-500 mt-2">{errorMessage}</p>
                  )}

                </div>
              </div>
            </>
          )}

          {/* Add manager screen */}
          {showAddManagerPopup && (
            <>
              <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
              <div
                ref={addManagerPopupRef}
                className="fixed inset-0 flex items-center justify-center z-50"

              >
                <div className="add-manager w-[488px] h-fit p-6 rounded-lg bg-white shadow-lg flex flex-col items-center">
                  <button
                    className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[485px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
                    onClick={() => setShowAddManagerPopup(false)}
                  >
                    X
                  </button>
                  <div className="relative w-[440px] h-12 mb-4">
                    <input
                      type="text"
                      value={managerName}
                      onChange={(e) => setManagerName(e.target.value)}
                      className="w-full h-full p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal"
                      placeholder="Sales Manager Name"
                    />
                    {!validateManagerName(managerName) && managerName.length > 0 && (
                      <p className="text-red-500 text-left text-xs">The first letter of the name must be capital.</p>
                    )}
                  </div>
                  <div className="relative w-[440px] h-12 mb-4">
                    <input
                      type="email"
                      value={managerEmail}
                      onChange={(e) => setManagerEmail(e.target.value)}
                      className="w-full h-full p-4  rounded-md border border-gray-300 font-manrope text-lg font-normal"
                      placeholder="Email ID"
                    />
                    <img src={EmailIcon} alt="Email" className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                    {!validateEmail(managerEmail) && managerEmail.length > 0 && (
                      <p className="text-red-500 text-left text-xs">Please enter a valid email address.</p>
                    )}
                  </div>
                  <div className="relative w-[440px] h-12 mb-4">
                    <input
                      type="text"
                      value={managerPhone}
                      onChange={handleManagerPhoneChange}
                      className="w-full h-full p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal"
                      placeholder="Phone No"
                      maxLength={10} // Ensures no more than 10 characters
                    />
                    <img src={PhoneIcon} alt="Phone" className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                    {!validatePhoneNumber(managerPhone) && managerPhone.length > 0 && (
                      <p className="text-red-500 text-left text-xs">Phone number must be exactly 10 digits.</p>
                    )}
                  </div>
                  <button
                    onClick={handleManagerSubmit}
                    className="w-fit create-manager-btn h-12 py-3 px-6 bg-[#3D2314] rounded-md text-center font-manrope text-lg font-medium text-white"
                    disabled={isManagerCreating}
                  >
                    {managerCreateStatus || 'Add'}
                  </button>
                  {managerErrorMessage && (
                    <p className="text-red-500 mt-2">{managerErrorMessage}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Add executive screen */}
          {showAddExecutivePopup && (
            <>
              <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
              <div
                ref={addExecutivePopupRef}
                className="fixed inset-0 flex items-center justify-center z-50"

              >
                <div className="add-executive w-[488px] h-fit p-6 rounded-lg bg-white shadow-lg flex flex-col items-center">
                  <button
                    className="closing-button absolute w-8 h-8 bg-white border border-gray-300 font-bold -mr-[485px] -mt-[35px] flex justify-center items-center p-2 rounded-full"
                    onClick={() => setShowAddExecutivePopup(false)}
                  >
                    X
                  </button>
                  <div className="relative w-[440px] h-12 mb-4">
                    <input
                      type="text"
                      value={executiveName}
                      onChange={(e) => setExecutiveName(e.target.value)}
                      className="w-full h-full p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal"
                      placeholder="Name"
                    />
                    {!validateManagerName(executiveName) && executiveName.length > 0 && (
                      <p className="text-red-500 text-left text-xs">The first letter of the name must be capital.</p>
                    )}
                  </div>
                  <div className="relative w-[440px] h-12 mb-4">
                    <input
                      type="email"
                      value={executiveEmail}
                      onChange={(e) => setExecutiveEmail(e.target.value)}
                      className="w-full h-full p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal"
                      placeholder="Executive Email ID"
                    />
                    <img src={EmailIcon} alt="Email" className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                    {!validateEmail(executiveEmail) && executiveEmail.length > 0 && (
                      <p className="text-red-500 text-left text-xs">Please enter a valid email address.</p>
                    )}
                  </div>
                  <div className="relative w-[440px] h-12 mb-4">
                    <input
                      type="text"
                      value={executivePhone}
                      onChange={handleExecutivePhoneChange}
                      className="w-full h-full p-4 rounded-md border border-gray-300 font-manrope text-lg font-normal"
                      placeholder="Phone No"
                      maxLength={10} // Ensures no more than 10 characters
                    />
                    <img src={PhoneIcon} alt="Phone" className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                    {!validatePhoneNumber(executivePhone) && executivePhone.length > 0 && (
                      <p className="text-red-500 text-left text-xs">Phone number must be exactly 10 digits.</p>
                    )}
                  </div>
                  <button
                    onClick={handleExecutiveSubmit}
                    className="w-fit create-executive-btn h-12 py-3 px-6 bg-[#3D2314] rounded-md text-center font-manrope text-lg font-medium text-white"
                    disabled={isExecutiveCreating}
                  >
                    {executiveCreateStatus || 'Add'}
                  </button>
                  {executiveErrorMessage && (
                    <p className="text-red-500 mt-2">{executiveErrorMessage}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Table5;
