import React, {useState, useEffect} from 'react';
import './styles.scss'

import { scrollTo } from '../utils';

import Head_img from '../assets/headline_spain.png'

export default function First_SP() {

    useEffect(() => {
		window.document.title="Verifique su elegibilidad ahora"
	}, [])

	const [quiz, setQuiz] = useState("¿Tienes menos de 65 años?")
    const [step, setStep] = useState("process")
    const [result, setResult] = useState(true)
    const [min, setMin] = useState(3)
    const [second, setSecond] = useState<any>(0)  
	
	const stepProcess = () => {
		if(step==="Revisando sus respuestas..."){
            setTimeout(() => {
                setStep("Coincidencia con las mejores opciones...")
                }, 1500);
            }
            if(step==="Coincidencia con las mejores opciones..."){
            setTimeout(() => {
                setStep("Confirmación de elegibilidad...")
                }, 1500);
            }
            if(step==="Confirmación de elegibilidad..."){
            setTimeout(() => {
                setStep("completed")
                }, 1500);
            }
        
            if(step==="completed"){
            const startTime:any = new Date();
            const Timer = setInterval(()=> {
                const nowTime:any = new Date();
                // setMin(min+1)
                setSecond((180-Math.round((nowTime-startTime)/1000))%60)
                setMin(Math.floor((180-Math.round((nowTime-startTime)/1000))/60))
            }, 1000)
        }
	}

	// React.useEffect(() => {
	//                 // getInfo()
	//                 console.log(time);
	//                 stepProcess()
	//                 const timer = setTimeout(() => setTime(+new Date()), 1000)
	//                 return () => clearTimeout(timer)
	//         }, [time]);


	useEffect(() => {
		stepProcess()
	}, [step, min])

	const topScroll = (id: any) => {
			// window.scrollTo(0, 0);
			// window.innerWidth < 1200 ? setIsMobile(false) : scrollTo({ id });
			scrollTo({ id });
		}

    const handleQuizP = () => {
        topScroll("btn")
        if(quiz === "¿Tienes menos de 65 años?"){
            setQuiz("¿Tiene Medicaid o Medicare?")
        }else{
            if(quiz === "¿Tiene Medicaid o Medicare?"){
                setQuiz("¿Tiene actualmente un Social Security Number?")
            }
            else{
                setStep("Revisando sus respuestas...")
                topScroll("top");
            }
        }
        }
    
    const handleQuizN = () => {
        topScroll("btn");
        if(quiz === "¿Tienes menos de 65 años?"){
            setQuiz("¿Tiene Medicaid o Medicare?")
        }else{
            if(quiz === "¿Tiene Medicaid o Medicare?"){
            setQuiz("¿Tiene actualmente un Social Security Number?")
            }else{
            if(quiz === "¿Tiene actualmente un Social Security Number?"){
                setQuiz("Si no es ciudadano estadounidense, ¿tiene actualmente un Premanent Resident Card?")
            }else{
                setResult(false)
                setStep("Revisando sus respuestas...")
                topScroll("top");
            }
            }
        }
    }

    return(
        <div>
			<div className='top-sticky' id='top'>USA Savings Journal</div>
            {step==="process"?
                <>
                <div className='main-container'>
                    <div className='main-descrition-bg'>
                    {/* <div className='main-des-title'>Biden extiende el plan de seguro de salud gratuito para los estadounidenses<br /> que ganan <span style={{backgroundColor:"yellow"}}>menos de $ 50k / año</span></div> */}
                    <img src = {Head_img} alt = "head" width = "100%" />
                    <div className='mian-des-1'>La fecha límite para asegurar su subsidio de salud finaliza el <span style = {{fontWeight:"700"}}>15 de enero</span>, ¡así que llame a la línea directa si califica!</div>
                    <div className='main-des-2'>Responda 2 preguntas simples a continuación para verificar la elegibilidad en solo 30 segundos</div>
                    </div>
                    <div className='survey'>
                    <div className='quiz' id='btn'>{quiz}</div>
                    <div className='answer'>
                        <div className='answer-btn' onClick={handleQuizP}>Sí</div>
                        <div className='answer-btn' onClick={handleQuizN}>No</div>
                    </div>
                    </div>
                </div>
                </>:
                (
                step!=="process" && step!=="completed"?
                    <div className='checking' style={{fontWeight:"700"}}>
                    {step}
                    </div>:
                    <div className='checking'>
                    {(result === true)?
                        <>
                        <div className='congrats'>¡Felicitaciones, USTED CALIFICA!</div>
                        <div className='top-description'>¡Haga una llamada rápida para reclamar su subsidio de salud!</div>
                        <div className='spots-count'>Lugares restantes: 4</div>
                        <div className='tap-direction'>👇 TOCA ABAJO PARA LLAMAR 👇</div>
                        <div className='call-btn'>
                            <a href = "tel:+18662270851">LLAMADA (866)-227-0851</a>
                        </div>
                        <div className='sub-title'>Nosotras hemos reservado tu lugar</div>
                        <div className='sub-description'>Debido al alto volumen de llamadas, su agente oficial está esperando solo 3 minutos, luego su lugar no estará reservado.</div>
                        <div className='timer'>
                            <div className='timer-cell'>{min}</div>
                            <div className='timer-cell'>:</div>
                            <div className='timer-cell'>{second}</div>
                        </div>
                        </>:
                        <div>Lo sentimos, no tiene derecho al subsidio sanitario!</div>
                    }
                    
                    </div>
                )
            }
            <div className='footer'>
                <div className='terms'>Terms & Conditions | Privacy Policy</div>
                <div className='copyright'>Copyright © 2022 - All right reserved USA Savings Journal.</div>
            </div>
		</div>
    )
} 