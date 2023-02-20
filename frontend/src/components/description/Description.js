import React, { Fragment, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MDBCol, MDBContainer, MDBRow, MDBBtn } from "mdbreact";
import "./Description.css"
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from "../../redux/slices/CartSlice";
// import { fetchProduct, selectCurrentProduct } from '../redux/slices/ProductSlice';
import { cookieKey, hostNameWithoutAPI } from '../../api/env';
import { getCookie } from '../../api/api';
// import { FetchProduct } from '../../api/product';
import { Breadcrumb } from './Breadcrumb';
import { generateProductAd } from './generateProductAd';

export function Description({data}) {

    const { userId, productName } = useParams();
    // const [product, setProduct] = useState({
    //     loading: true,
    //     data: [],
    //     error: false
    // })
    let [cartStateToReducer, setCartStateToReducer] = useState({
        rate: 0,
        size: "SM",
        quantity: 1
    })

    console.log({ data })
    console.log({ rendered: "here" })

    let handleInputChange = (event) => {
      

        const target = event.target;
        let value = target.value;
        value = (Object.is(parseInt(value), NaN)) ? value : parseInt(value);
        const name = target.name;
        if (name === "quantity" && (value === null || value === undefined)) {
            return;
        }
        else if (name === "quantity" && value < 0) {
            alert("Value can't be less than zero")
            return;
        }
        setCartStateToReducer({
            ...cartStateToReducer,
            [name]: value
        });
    }

    const dispatch = useDispatch();

    let addToCart = async () => {
        let size = document.querySelector('select[name=size]').value
        let quantity = parseFloat(document.querySelector('input[name=quantity]').value)
        let body = { size, quantity }
        console.log({ size, quantity })

        if (cartStateToReducer.quantity > 0) {

            const token = getCookie(cookieKey)
            if (token === "null" || token === null || token === undefined) {

                alert("Sign in first!")
                return "";
            }
            else {
                alert("Added to cart.")
                await dispatch(addProduct({ productId: userId, body }))
            }

        }
        else {
            alert("Quantity can't be less than zero")
        }
    }


    return (

        <Fragment>
            {data.name !== undefined &&
                < div style={{ marginTop: "-80px", minHeight: "80vh" }}>
                    <br />
                    <Breadcrumb type={data.type} productName={data.name} productid={data._id} />
                    <MDBContainer className="pt-0">
                        <MDBRow style={{ marginTop: 0, paddingTop: 0 }} className="pt-0">
                            <MDBCol xs="12" lg="6" className="col-xs-12-imageWraper" >
                                <img src={`${hostNameWithoutAPI}assets/${data.type}/imageL${data.image.substring(5)}`} alt={`${data.name}`}
                                    className="description-img frame"
                                />
                            </MDBCol>
                            <MDBCol xs="12" lg="6">
                                <div className="special-font font-weight-bold mq-center">
                                    <h5 className="font-weight-bold ">
                                        {data.name}
                                    </h5>
                                    <h5 className="font-weight-bold ">
                                        {data.price}
                                    </h5>
                                    <div className="rate" onChange={(evt) => { handleInputChange(evt) }}>
                                        <input type="radio" id="star5" name="rate" value="5" />
                                        <label htmlFor="star5" title="text">5 stars</label>
                                        <input type="radio" id="star4" name="rate" value="4" />
                                        <label htmlFor="star4" title="text">4 stars</label>
                                        <input type="radio" id="star3" name="rate" value="3" />
                                        <label htmlFor="star3" title="text">3 stars</label>
                                        <input type="radio" id="star2" name="rate" value="2" />
                                        <label htmlFor="star2" title="text">2 stars</label>
                                        <input type="radio" id="star1" name="rate" value="1" />
                                        <label htmlFor="star1" title="text">1 star</label>
                                    </div>
                                </div>
                                <br /> <hr /> <br />
                                <div className="special-font">
                                    <p> Premium quality {data.type} </p>
                                    <p> {generateProductAd(data.type)}</p>
                                    <br />
                                    <p className="text"> Please cross-check your size with the size chart to ensure a good fit. <br /> </p>
                                </div>
                                <br />
                                <table>
                                    <tbody >
                                        <tr className="mb-4">
                                            <td className="text-left ml-0 px-0"> <span>SIZE: </span> </td>
                                            <td>
                                                {data.type !== "accessories" &&
                                                    <select className="form-control" style={{ width: "100px" }} onChange={(evt) => { handleInputChange(evt) }} name="size">
                                                        <option>SM</option>
                                                        <option>L</option>
                                                        <option>XL</option>
                                                        <option>XXL</option>
                                                    </select>
                                                }
                                                {data.type === "accessories" &&
                                                    <select className="form-control" style={{ width: "100px" }} onChange={(evt) => { handleInputChange(evt) }} name="size">
                                                        <option>Standard</option>
                                                    </select>
                                                }
                                            </td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td className="text-left ml-0 px-0"> <span>QUANTITY: </span> </td>
                                            <td>
                                                <input type="number" name="quantity" style={{ width: "100px" }} value={cartStateToReducer.quantity} className="form-control" onChange={(evt) => { handleInputChange(evt) }} />,
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
                                <br /> <br />
                                <MDBBtn outline color="amber" className="mx-auto" onClick={addToCart}>ADD TO CART</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol > </MDBCol>
                            <MDBCol xs="12" lg="6"> <i> Note: Your Product will be dispatched/ shipped within 7-10 days </i> </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            }
        </Fragment>
    )
}