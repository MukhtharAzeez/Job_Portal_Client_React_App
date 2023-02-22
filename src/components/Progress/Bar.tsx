
type Props = {
    animationDuration: number,
    progress: number
}
export const Bar = ({ animationDuration, progress }: Props) => {
    return (
        <div className="bg-purple-800 h-1 w-full left-0 top-0 fixed z-50"
            style={{
                marginLeft: `${(-1 + progress) * 100}%`,
                transition: `margin-left ${animationDuration}ms linear`
            }}>

        </div>
    )
}