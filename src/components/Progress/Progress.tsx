import { NProgress } from "@tanem/react-nprogress";
import { Bar } from "./Bar";
import { Container } from "./Container";
type Props = {  
    isAnimating: boolean
}

export const Progress =({isAnimating}:Props)=>{
    const { animationDuration, isFinished, progress } = NProgress ({
        isAnimating,
    })

    return (
        <Container animationDuration={animationDuration} isFinished={isFinished}>
            <Bar animationDuration={animationDuration} progress={progress}/>
        </Container>
    )
}