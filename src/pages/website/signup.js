import React, { useState }  from  'react';
import { signup } from '../../api/authAPI';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { authenticate } from '../../auth';
const Signup = () =>{
    const {
        register, 
        handleSubmit,
        formState:{ errors }

    } = useForm();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const onSubmit= async (user) =>{
        try {
            const response = await signup(user);
            
            setSuccess(true);
            setError("")
        } catch (error) {
            setError(error.response.data)
            
        }
    }
    return (
        <form className="" onSubmit={handleSubmit(onSubmit)}>
            <h2>Đăng kí</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Đăng kí thành công. Click <Link to="/signin">vào đây</Link> để đăng nhập</div>}
            <div className="mb-3">
                <label htmlFor="" className="form-label">Tên</label>
                <input type="text" className="form-control" {...register('name')} />
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Email</label>
                <input type="Email" className="form-control" {...register('email',{ required:true})}/>
                {errors.email && <span className="d-block mt-2 text-danger">Email không được để trống</span>}
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Password</label>
                <input type="password" className="form-control" {...register('password',{ required:true})}/>
                {errors.password && <span className="d-block mt-2 text-danger">Password không được để trống</span>}
            </div>
            <button type="submit" className="btn btn-primary">Đăng kí</button>
        </form>
    )
}
export default Signup