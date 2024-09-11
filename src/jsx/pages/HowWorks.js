import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from "./newstyle.module.css";
import sidebar1 from "../../images/naija/sidebar-1-img.jpg";
import sidebar2 from "../../images/naija/sidebar-2-img.jpg";
import sidebar3 from "../../images/naija/sidebar-3-img.jpg";
import help_call from "../../images/naija/help_call.jpg";
import got_insurance from "../../images/naija/got_insurance.jpg";
// import s from "./newstyle.module.css"
// import styles from './MyComponent.module.css';
import gif from "../../images/naija/970x90_2.gif";  // Adjust the path to your gif file
import axios from 'axios';
import { API_URL } from '../../apiconfig';

const HowWorks = () => {
  const [howData,setHowData] = useState([])
  useEffect(async()=>{
    const {data} = await axios.get(`${API_URL}/api/how_it_works`)
    console.log("data",data.data);
    
    setHowData(data.data)
  },[])
  return (
    // <div></div>
    <Container>
      <Row className="my-4">
      <div className={styles["left_section"]}>
      	<div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={sidebar1}/> </div>
        <div className={styles["sidebar"]}> <img alt="sidebar-1-img" src={sidebar2}/> </div>
        <div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={sidebar3}/> </div>
      </div>
        
        <Col md={7}>
         
            <Card.Body>
              <h1 className={styles["custom-title"]}>How It Works</h1>
              <Card.Text>
                {howData && howData.map((element,ind)=>{
                  return(
                    <div key={ind} dangerouslySetInnerHTML={{__html:element.how_it_work}}>

                    </div>
                  )
                })}
                {/* <strong>A Guide to Understanding Health Insurance</strong>
                <p>
                  The Nigerian National Health Insurance scheme (NHIS) is planned to attract more resources to the health care sector and improve the level of access and utilization of healthcare services. It is also intended to protect people from the catastrophic financial implications of illnesses.
                </p>
                <strong className='text-green'>What to Consider When Choosing a Health Insurance Plan</strong>
                <p>
                  There are many things to consider when choosing a health insurance plan. You want a plan that will meet your needs for types of coverage, access, and dependability at a reasonable cost. Ask yourself the following questions to help steer your decision:
                </p>
                <ul>
                  <li><strong>Do I want basic or more comprehensive coverage?</strong></li>
                  <p>
                    Some insurance plans offer basic coverage that protects your finances in the event of an illness or injury resulting in a hospital stay. These types of plans typically have a lower premium.
                  </p>
                  <p>
                    Other health insurance plans offer more doctor visits to include healthcare, maternity benefits, prescription drug benefits, eye care, and routine doctor visits. These types of plans tend to have a higher premium and may be more appropriate for those who may use their insurance benefits on a regular basis.
                  </p>
                  <li><strong>Does the health insurance plan cover me if I travel?</strong></li>
                  <p>
                    Some plans have provider networks that are based on where you live. If you travel outside of that area, you are typically not covered by your health insurance plan.
                  </p>
                  <p>
                    These types of plans tend to have a higher premium and may be more appropriate for those who may use their insurance benefits on a regular basis.
                  </p>
                  <li><strong>Does the health insurance plan cover services that are important to me?</strong></li>
                  <p>
                    You must decide what services are important to you, such as preventive care and maternity coverage. Some plans do not cover these types of services; therefore, you may want to consider plans that fit into your needs.
                  </p>
                  <li><strong>Does the health insurance plan cover my family?</strong></li>
                  <p>
                    Make sure to purchase family coverage and not single-only coverage just for you if you need coverage for your family now or in the near future.
                  </p>
                  <li><strong>Are prescription drugs covered under my health insurance plan?</strong></li>
                  <p>
                    Prescription medication coverage varies by plan.
                  </p>
                </ul>
                <strong className='text-green'>How to Save on Healthcare Costs</strong>
                <p>
                  There are ways to save on your healthcare expenses too. Becoming familiar with your healthcare options may help keep you and your family healthier without breaking the bank.
                </p>
                <ul>
                  <li><strong>Choose the right level of care</strong></li>
                  <p>When you need care, knowing your options can help save you time and money. When you choose the right level of care for your situation, it helps keep healthcare costs down and affordable for everyone.</p>
                  <li><strong>Take advantage of resources to shop for care</strong></li>
                  <p>The more you know about healthcare quality, safety, services and costs, the easier it is for you to choose wisely when it comes to the care that's right for you.</p>
                  <p>Higher costs don't necessarily mean higher quality. High value is what's important when looking at healthcare. You can find care that's high-quality and high-value using online tools and resources.</p>
                </ul> */}
              </Card.Text>
            </Card.Body>
          
        </Col>
        
        <div className={styles["right_section"]}>
            <div className={styles["sidebar"]}> <img alt="sidebar-1-img" src={help_call}/> </div>
            <div className={styles["sidebar"]}> <img alt="sidebar-1-img" src={sidebar1}/> </div>
            <div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={sidebar2}/> </div>
            <div className={styles["sidebar"]}> <img alt="sidebar-2-img" src={got_insurance}/> </div>
      </div>
      </Row>
      
      <Row>
        <Col>
          <div className={styles["advert"]}>
            <div className={styles["container"]}>
              <div className={styles["row"]}>
                <a href="http://www.medicwestafrica.com/" target="_blank" rel="noopener noreferrer">
                  <img src={gif} alt="Advertisement" className={styles["advert-img"]}/>
                </a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HowWorks;
