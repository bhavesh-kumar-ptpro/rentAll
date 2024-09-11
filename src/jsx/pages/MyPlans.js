import React, { useState, useEffect } from 'react'
import sidebar1 from "../../images/naija/sidebar-1-img.jpg";
import sidebar2 from "../../images/naija/sidebar-2-img.jpg";
import help_call from "../../images/naija/help_call.jpg";
import got_insurance from "../../images/naija/got_insurance.jpg";
import gif from "../../images/naija/970x90_2.gif";
import styles from "../layouts/newstyle.module.css";
import cx from 'classnames';
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../apiconfig";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const MyPlans = () => {
    const [searchdata, setsearchdata] = useState([]);
    const [Sort, setSort] = useState("");
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    let plantype = 'Corporate'

    console.log(plantype);

    let staticdata = {
        "sortOrder": "DESC"
    }

    useEffect(() => {
        getHmoData()
        // const fetchData = async () => {
        //     const { data } = await axios.get(`${API_URL}/api/hmoHospitalMapping/hmo`)
        // };
        // fetchData();
    }, []);
    const getHmoData = async () => {
        const { data } = await axios.post(`${API_URL}/api/corporate_hmo/sortOrder`,  staticdata)
        setsearchdata(data.data)
    }

    const handleChange = async (e) => {
        console.log(e.target.value);

        setSort(e.target.value)
        // const { data } = await axios.post(`${API_URL}/api/indivual_plan_master/search`,staticdata )
        // setsearchdata(data.data)
    }

    // const listItems = searchdata.map(user =>
    //     <li key={user.id}>
    //         <div className={styles["plan-list"]}>
    //             <div className={styles["brand-img"]}><img src={`${API_URL}/public/image/Company_Logo/` + user.logo_url} alt="1" /></div>
    //             <p className={styles["brand"]}> {user.company_name}</p>
    //             <p className={styles["plan-name"]}>{user.plan_type}</p>

    //         </div>

    //         <div className={styles["duration-list"]}>
    //             {user.max_duration}
    //         </div>

    //         <div className={styles["cost-list"]}>
    //             {/* <p className={styles["cost"]}>₦{user.monthly_cost}</p> */}
    //             <p>(₦ {user.yearly_cost} per year)</p>
    //         </div>

    //         <div className={styles["action-list"]}>

    //             <p><a className={styles["button"]} href={`/user/buyplan/${user.id}/${plantype}`}>Apply Now</a></p>
    //             <p><a className={cx(styles["no-btn"], styles["button"])} href={`/user/FamilyInsurance/${user.id}`}>Details</a></p>
    //             <p>
    //                 <input type="checkbox" id="compare" />
    //                 <label for="compare">Compare</label>
    //             </p>
    //         </div>
    //     </li>
    // );



    // console.log(searchdata);
    return (
        // <div></div>

        <div className={styles["main-section"]} style={{ backgroundColor: "white" }}>
            <div className={styles["top_container_menu"]}>
                {/* <div className={styles["container"]}>
                    <div className={styles["health_insurance_menu"]}>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li className={styles["last_arrows"]}><a href="#" className={styles["active"]}>My Plans</a></li>
                        </ul>
                    </div>
                </div> */}
            </div>
            <div className={styles["home-section-1"]}>
                <div className={styles["container"]}>
                    <div className={cx(styles["row"], styles["inner_contaniner"])}>
                        {/* <div className={styles["left_section"]}>
                            <h2 className={styles["summary_tittle"]}>Filter Plan</h2>
                            <div className={styles["left-nav"]}>
                                <ul>
                                    <li><a href="#">HMO<i className={styles["icon-caret"]}></i></a></li>
                                    <li><a href="#">Local / National<i className={styles["icon-caret"]}></i></a></li>
                                    <li className="active"><a className={cx(styles["sb-toggle-submenu"], styles["sb-caret2"])} href="javascript:void(0);">Yearly Cost <i className="icon-caret"></i></a>
                                        <ul className={cx(styles["sb-submenu"], styles["sb-submenu-active"])} style={{ display: "block" }}>
                                            <li><a>
                                                <input type="checkbox" id="filter1" />
                                                <label for="filter1">Under ₦25000 <span></span></label>
                                            </a>
                                            </li>
                                            <li><a>
                                                <input type="checkbox" id="filter2" checked="" />
                                                <label for="filter2">₦25000 to ₦50000 <span></span></label>
                                            </a>
                                            </li>
                                            <li><a>
                                                <input type="checkbox" id="filter3" />
                                                <label for="filter3">₦50000 & Above <span></span></label>
                                            </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Deductible <i className={styles["icon-caret"]}></i></a></li>
                                    <li><a href="#">Additional Features <i className={styles["icon-caret"]}></i></a></li>
                                </ul>
                            </div>
                            <div className={styles["sidebar"]}> <img alt="sidebar-1-img" src={sidebar1} /> </div>
                            <div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={sidebar2} /> </div>
                        </div> */}
                        <div className={cx(styles["middil_section"], styles["search-result-box"])}>
                            <h2 style={{ color: "#00a65a" }}>My Plans</h2>
                            <h4>Here are  <span className={styles["blue"]}></span> your plans.
                                <span className={styles["pending-right"]}>
                                    {/* <a href="#">See All</a>     */}
                                    Sort by Price
                                    <select onChange={(e) => handleChange(e)}>
                                        <option value={"asc"}>High To Low</option>
                                        <option value={"desc"}>Low To High</option>
                                    </select>
                                </span>
                            </h4>
                            <div className={styles["search-result"]}>
                                {/* <ul>
                                    <li>
                                        <div className={styles["item_tittle"]}>
                                            <div className={styles["title-plan"]}>Plan</div>
                                            <div className={styles["title-mduration"]}>Max Duration</div>
                                            <div className={styles["title-mcost"]}>Monthly Cost</div>
                                        </div>
                                    </li>
                                </ul> */}
                                {/* {
                                    searchdata && searchdata.length > 0 && searchdata.map((user, i) => {
                                        return ( */}

                                <ul >
                                    <li>
                                        <div className={styles["item_tittle"]}>
                                            <div className={styles["title-plan"]}>Plan</div>
                                            <div className={styles["title-mduration"]}>Duration</div>
                                            <div className={styles["title-mcost"]}>Yearly Cost</div>
                                            <div className={styles["title-action"]}>Action</div>
                                        </div>
                                    </li>
                                    {/* {listItems} */}

                                </ul>


                                {/* )
                                    })} */}
                            </div>
                        </div>
                        <div className={styles["right_section"]}>
                            <div className={styles["sidebar"]}> <img alt="sidebar-1-img" src={help_call} /> </div>
                            <div className={styles["sidebar"]}> <img alt="sidebar-1-img" src={sidebar1} /> </div>
                            <div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={sidebar2} /> </div>
                            <div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={got_insurance} /> </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default MyPlans



