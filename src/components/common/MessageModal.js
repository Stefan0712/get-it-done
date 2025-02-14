import { IconLibrary } from '../../IconLibrary';
import { useEffect } from 'react';


const MessageModal = ({data, closeModal}) => {
    const messageModal = {
        width: '100%',
        height: '50px',
        gap: '10px',
        display: 'flex',
        position: 'absolute',
        top: '0',
        left: '5px',
        zIndex: '20',
        backgroundColor: data.type === 'success' ? '#4CAF50' : data.type === 'info' ? '#0F0F0F' : '#E53935',
        borderRadius: '5px'
    };

    const modalContent = {
        width: 'calc(100% - 60px)',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10px',
        fontSize: '20px'
    };
    const modalButton = {
        backgroundColor: 'transparent',
        border: 'none',
        marginLeft: 'auto',
        height: '50px',
        width: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };
    const modalIcon = {
        height: '40px',
        width: '40px'
    };

    useEffect(()=>{
        setTimeout(()=>closeModal(), 3000)
    },[])
    return ( 
        <div style={messageModal} className='slideInFromTop'>
            <div style={modalContent}>
                <p>{data.msg}</p>
            </div>
            <button style={modalButton} onClick={closeModal}><img style={modalIcon} src={IconLibrary.Close} alt='close message modal' /></button>
        </div>
     );
}
 
export default MessageModal;



