import React from 'react' 
import './Home.css'
import homeIcon from '../Assets/icon.jpg'
import arrowIcon from '../Assets/arrow.png'
import byeIcon from '../Assets/bye.jpg'

const Home = () => {
    return(
        <div className="home">
            <div className="homeLeft">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="handIcon">
                        <p>new</p>
                        <img src={byeIcon} alt='' className='handImage'/>
                    </div>
                <p>collections</p>
                <p>for everyone</p>
                </div>
                <div className="homeLatest">
                    <div>Latest Collections</div>
                    <img src={arrowIcon} alt='' className='arrowImage'/>
                </div>
            </div>
            <div className="homeRight">
                <img src={homeIcon} alt = '' className='iconImage'/>
            </div>
        </div>
    )
}

export default Home;
