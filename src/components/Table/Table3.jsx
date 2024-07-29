import { useEffect, useState } from "react";
import Searchsvg from "../../assets/material-symbols_search.svg";
import axios from "axios";
import { format } from "date-fns";
import Loding from "../Loding/Loding";
import { PiNotePencilBold } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import "../Home.css";

const Table3 = () => {
  const [valueinput, setvalueinput] = useState(""); // Search input
  const [data, setdata] = useState([]); // Original data
  const [filteredData, setFilteredData] = useState([]); // Filtered data
  const location = useLocation();
  const id = location.state || 0;
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    await axios.delete(`http://localhost:8000/api/record/deleteRecord/${deleteId}`);
    setShowPopup(false);
    fetchData(); // Refresh data after deletion
  };

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:8000/api/record/getAllRecords`);
    setdata(res.data);
    setFilteredData(res.data); // Initialize filtered data
  };

  useEffect(() => {
    fetchData();
  }, []);

  const DateupdatedAt = (DateupdatedAt) => {
    const formattedDate = format(new Date(DateupdatedAt), "dd MMM | hh:mm a");
    return formattedDate;
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setvalueinput(query);

    // Filter data based on the search query
    const filtered = data.filter((item) =>
      item.customerName.toLowerCase().includes(query) ||
      item.channelPartnerName.toLowerCase().includes(query) ||
      item.projectName.toLowerCase().includes(query)
    );

    setFilteredData(filtered);
  };

  return (
    <>
      {data.length === 0 ? (
        <Loding />
      ) : (
        <div className="Tab3 p-1 overflow-x-auto flex flex-col gap-9 bg-custom-bg h-screen" style={{ gap: "10px" }}>
          <div className="p-4 overflow-x-auto flex flex-col gap-9 bg-custom-bg" style={{ gap: "20px", paddingTop: "30px" }}>
            <h1 className="font-bold flex items-center gap-1" style={{ fontFamily: "Poppins", fontSize: "24px", fontWeight: "500" }}>
              Home
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <Link to="/Channel_Partners">
                <span className="font-medium" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "24px" }}>
                  Channel Partners
                </span>
              </Link>
              <IoIosArrowForward style={{ color: "#1C1B1F" }} />
              <span className="font-medium" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "24px" }}>
                Rainbow Overseas
              </span>
            </h1>
            <div className="flex flex-row items-center justify-start text-center flex items-center justify-center ml-80">
              <div className="flex justify-start items-center w-[50%] lg:block relative lg:w-[36rem] rounded-full mr-96">
                <input
                  className="w-full py-2 px-12 rounded-full"
                  style={{ border: "1px solid #3D2314", boxShadow: "0px 0px 4px 0px #00000040" }}
                  type="text"
                  value={valueinput}
                  onChange={handleSearch} // Handle search input
                  placeholder="Search"
                />
                <img style={{ top: "0.6rem" }} src={Searchsvg} alt="Search" className="absolute left-4" />
              </div>
            </div>
            <div className="outer-wrapper">
              <div className="table-wrapper overflow-x-auto">
                <table className="min-w-full bg-white" style={{ boxShadow: "0px 0px 4px 0px #00000040" }}>
                  <thead>
                    <tr className="text-[9px] lg:text-[15px] text-left bg-[#E8E8E8]">
                      <th className="font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "left", paddingLeft: "7px", padding: "5px", width: '65px' }}>Serial No</th>
                      <th className="font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", paddingLeft: "7px", padding: "5px", width: '149px' }}>Date</th>
                      <th className="border-b text-center font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", padding: "5px", width: '181px' }}>Customer Name</th>
                      <th className="border-b text-center font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", padding: "5px", width: '145px' }}>Last 4 Digit of Mobile No</th>
                      <th className="border-b font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", padding: "5px", width: '155px' }}>List of Channel Partners</th>
                      <th className="border-b text-center font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", padding: "5px", width: '109px' }}>Agent Phone No</th>
                      <th className="border-b text-center font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", padding: "5px", width: '93px' }}>Project</th>
                      <th className="border-b font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", padding: "5px", width: '164px' }}>Attendant</th>
                      <th className="border-b font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", padding: "5px", width: '42px' }}>Edit</th>
                      <th className="border-b font-medium" style={{ fontFamily: "Manrope", fontSize: "12px", textAlign: "center", padding: "5px", width: '102px' }}>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => ( // Use filtered data
                      <tr className="text-[9px] lg:text-[14px]" key={item.id}>
                        <td className="py-3 ml-6 text-center flex items-center" style={{ paddingLeft: "5px", textAlign: 'center' }}>{index + 1}</td>
                        <td className="py-1 border-b" style={{ paddingLeft: "5px", textAlign: 'center' }}>{DateupdatedAt(item.updatedAt)}</td>
                        <td className="py-1 border-b text-center">{item.channelPartnerName}</td>
                        <td className="py-1 border-b text-center">{item.customerMobileLastFour}</td>
                        <td className="py-1 border-b text-center">{item.customerName}</td>
                        <td className="py-1 border-b text-center">8484815614</td>
                        <td className="py-1 border-b text-center">{item.projectName}</td>
                        <td className="py-1 border-b text-center">{item.attendantName}</td>
                        <td className="py-1 px-3 border-b text-center">
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Link to={`/EditForm2/${item._id}`}>
                              <PiNotePencilBold style={{ cursor: "pointer", fontSize: "18px", color: "#632E04" }} />
                            </Link>
                          </div>
                        </td>
                        <td className="py-1 px-3 border-b text-center">
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <RiDeleteBin6Line onClick={() => handleDeleteClick(item._id)} style={{ cursor: "pointer", fontSize: "18px", color: "#930000" }} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center" style={{ width: '300px' }}>
            <p className="mb-4" style={{ fontFamily: 'Manrope', fontSize: '14px', fontWeight: '500' }}>Are you sure you want to delete this row?</p>
            <p className="mb-4" style={{ fontFamily: 'Manrope', fontSize: '12px', color: '#555' }}>This action cannot be undone.</p>
            <div className="flex justify-around">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded" style={{ width: '80px', fontFamily: 'Manrope', fontSize: '12px', fontWeight: '500' }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded" style={{ width: '80px', fontFamily: 'Manrope', fontSize: '12px', fontWeight: '500' }}
              >
                Delete
              </button>
            </div>
            <p className="mt-4" style={{ fontFamily: 'Manrope', fontSize: '10px', color: '#555' }}>Select "Delete" to confirm.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Table3;
