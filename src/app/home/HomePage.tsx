import React from 'react'
import HeroSection from '../components/hero/HeroSection'

type Props = {}

const HomePage = (props: Props) => {
    return (
        <>
            <div className="homePage overflow-scroll min-h-screen bg-gradient-to-r from-[#232526] to-[#414345]  ">
                    <div className="heroSection">
                        <HeroSection/>
                    </div>
            </div>  
        </>
    )
}

export default HomePage