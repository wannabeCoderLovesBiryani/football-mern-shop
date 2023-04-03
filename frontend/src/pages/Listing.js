import React, { useEffect } from 'react'
import GridVertical from '../components/listing/GridVertical'
import Overlay from '../components/listing/Overlay'
import JerseyImg from "../assets/Jerseys.jpg"
import AccessoriesImg from "../assets/Accessories.jpg"
import BootsImg from "../assets/Boots.jpg"
import { useParams } from 'react-router-dom'
import { FetchAll } from '../api/product'
import useLoadingFetchError from '../helper/loader/useFetchHook'
import FullPageIntroWithNonFixedNavbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { MDBContainer } from 'mdbreact'
import Spinner from '../components/notifications/spinner'
import Error from '../components/notifications/error'
import Hero2 from '../components/common/Hero2'
import Hero0 from '../components/common/Hero0'

const description = {
    jerseys: {
        img: JerseyImg,
        h1: "Wear your best",
        h5: "IN THE FIELD"
    },
    boots: {
        img: BootsImg,
        h1: "Premium Quality",
        h5: "FOOTWEAR"
    },
    accessories: {
        img: AccessoriesImg,
        h1: "The very best",
        h5: "FOOTBALL ACCESSORIES"
    },
}

function Listing() {

    const { productName } = useParams();

    let { data, error, loading } = useLoadingFetchError(FetchAll, productName)

    useEffect(() => {
        let controller = new AbortController();

        return () => {
            return () => controller?.abort();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  

    return (
        <>
            <FullPageIntroWithNonFixedNavbar />
            <MDBContainer fluid className="main-container">
                <div>
                    <Overlay imgSrc={description[productName]['img']} alt={productName} >
                        <h1>{description[productName]['h1'] ?? ""}</h1>
                        {description[productName]['h5'] && <h5>{description[productName]['h5']}</h5>}
                    </Overlay>
                    {
                        !error && !loading ?
                            (
                                data && data[0] !== undefined &&
                                <GridVertical productName={productName} data={data} />
                            ) :
                            <>
                                {
                                    error && <div className="main-container"> <Error /> </div>
                                }
                                {
                                    loading && <div className="main-container"> <Spinner /> </div>
                                }

                            </>
                    }
                    <br />
                </div>
            </MDBContainer>
            <Hero2 />
            <Hero0 />

            <Footer />
        </>
    )
}

export default Listing
