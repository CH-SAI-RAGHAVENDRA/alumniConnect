import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    console.log(name,email,password)
    const handleSubmit = async (e)=>{
        e.preventDefault();
        await axios.post('http://localhost:8080/api/register', {
            name,
            email,
            password
        }).then((result) => {
            if(result.data === "exists"){
                navigate('/error');
            }else{
            console.log((result))
            navigate('/login')}
        }
        ).catch(err=>{
            console.log(err);
        })
    }
  return (
    <div>
    <section className="vh-100" style={{backgroundColor: '#eee'}} >
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{borderRadius: 25}}>
                <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                        <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw" />
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input type="text" id="Name" className="form-control"  onChange={(e)=>{
                                setName(e.target.value)
                            }}/>
                            <label className="form-label" htmlFor="Name">Your Name</label>
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input type="email" id="Email" className="form-control" onChange={(e)=>{
                                setEmail(e.target.value);
                            }}/>
                            <label className="form-label" htmlFor="Email">Your Email</label>
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw" />
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <input type="password" id="Pass" className="form-control"  onChange={(e)=>{
                                setPassword(e.target.value);
                            }}/>
                            <label className="form-label" htmlFor="Pass">Password</label>
                            </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-5">
                            <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3c" />
                            <label className="form-check-label" htmlFor="form2Example3">
                            I agree all statements in <a href="#!">Terms of service</a>
                            </label>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <Link to='/Login'><button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" onClick={handleSubmit}>Register</button></Link>
                        </div>
                        </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>

    </div>
  )
}

export default Register
