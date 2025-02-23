


const Toggle = ({isActive, functionToRun}) => {

    const buttonStyles = {
        backgroundColor: isActive ? 'var(--accent-color)' : 'white',
        height: '28px',
        width: '50px',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2px',
    }
    const ball = {
        width: '22px',
        height: '22px',
        borderRadius: '30px',
        backgroundColor: isActive ? 'white' : 'var(--bg-color)',
        transition: 'transform 0.2s ease-in-out', 
        transform: isActive ? 'translateX(22px)' : 'translateX(0)',
    };
    



    return ( 
        <button className="toggle-button" onClick={functionToRun} style={buttonStyles}>
            <div style={ball}></div>
        </button>
     );
}
 
export default Toggle;