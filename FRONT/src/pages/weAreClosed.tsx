import styles1 from '../styles/spectator/weAreClosed.module.css'; const { closed } = styles1;

const WeAreClosed = () => {

    return(
        <div 
            className={`${closed} backgroundFromReset flexCenterAbsolute`}
            style={{backgroundImage:`url(assets/bicopng.png)`}}
            >
            {/*<img src="src/assets/fungi.png" />*/}
            <h2>BCO - WORKS</h2>
        </div>
    )

}

export default WeAreClosed