import copyImg from '../assets/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomCodeToClipBoard() {
        navigator.clipboard.writeText(props.code);
    }

    return(
        <button 
        className="room-code"
        onClick={copyRoomCodeToClipBoard}
        >
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #-MlmIeGF0DgOccKmtME9</span>
        </button>
    );
}