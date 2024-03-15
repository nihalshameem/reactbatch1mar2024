import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import './LoginForm.css';
import {Button, TextField} from "@mui/material";
import LoginImagePath from '../../assets/login.jpg';
import * as yup from 'yup'
import {useFormik} from "formik";

const validationSchema=yup.object({
    email:yup
        .string("Enter Email")
        .email("Email Format not Correct")
        .required("Email Required"),
    password: yup
        .string("Enter Password")
        .min(8,"Minimum Length 8")
        .required("Password Required")
})


const LoginForm = () => {
    const formik =useFormik({
        initialValues:{
            "email":"sample@gmail.com",
            "password":"********"
        },
        validationSchema:validationSchema,
        onSubmit:(values)=>{
          alert(JSON.stringify(values))
            if (userInput === captchaText) {
                alert('Success');
            } else {
                alert('Incorrect');
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                initializeCaptcha(ctx);
            }
        }

    });
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const canvasRef = useRef(null);
    const generateRandomChar = (min, max) =>
        String.fromCharCode(Math.floor
        (Math.random() * (max - min + 1) + min));

    const generateCaptchaText = () => {
        let captcha = '';
        for (let i = 0; i < 3; i++) {
            captcha += generateRandomChar(65, 90);
            captcha += generateRandomChar(97, 122);
            captcha += generateRandomChar(48, 57);
        }
        return captcha.split('').sort(
            () => Math.random() - 0.5).join('');
    };

    const drawCaptchaOnCanvas = (ctx, captcha) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
        const letterSpace = 150 / captcha.length;
        for (let i = 0; i < captcha.length; i++) {
            const xInitialSpace = 25;
            ctx.font = '20px Roboto Mono';
            ctx.fillStyle = textColors[Math.floor(
                Math.random() * 2)];
            ctx.fillText(
                captcha[i],
                xInitialSpace + i * letterSpace,

                // Randomize Y position slightly
                Math.floor(Math.random() * 16 + 25),
                100
            );
        }
    };

    const initializeCaptcha = (ctx) => {
        setUserInput('');
        const newCaptcha = generateCaptchaText();
        setCaptchaText(newCaptcha);
        drawCaptchaOnCanvas(ctx, newCaptcha);
    };

    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
    };

    return (
         <div>
         <img src={LoginImagePath} className="LoginImage"/>
             <form onSubmit={formik.handleSubmit}>
                 <TextField id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={formik.errors.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            margin="dense">

                 </TextField>
                 <TextField id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={formik.errors.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            fullWidth margin="dense">

                 </TextField>
                 <div className="Canvas-header">
                     <canvas ref={canvasRef}
                             width="200"
                             height="70">

                     </canvas>
                     <button id="reload-button" className="reload-button" variant="contained" onClick={
                         () => initializeCaptcha(
                             canvasRef.current.getContext('2d'))}>
                         Reload
                     </button>
                 </div>
                 <TextField
                     type="text"
                     id="user-input"
                     placeholder="Enter the text in the image"
                     value={userInput}
                     fullWidth
                     margin="dense"
                     onChange={handleUserInputChange}></TextField>
                 <Button type="submit" variant="contained">
                     Submit
                 </Button>
             </form>
         </div>
    )
};

LoginForm.propTypes = {};

LoginForm.defaultProps = {};

export default LoginForm;
