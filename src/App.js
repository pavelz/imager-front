import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
const FileDownload = require('js-file-download');

function App() {
    const [selectedFile, setSelectedFile] = useState([]);
    const [fileType, setFileType] = useState("jpeg");

    let onClickHandler = () => {
        const data = new FormData()

        data.append("fileType", fileType);
        data.append('file', selectedFile);
        axios.post("http://localhost:3001/convert", data, { // receive two parameter endpoint url ,form data
            responseType: 'arraybuffer'
        })
            .then(res => { // then print response status
                let extensions  = /(jpe?g|png|bmp|gif)$/i
                let filename = selectedFile.name.replace(extensions, fileType)
                FileDownload(res.data, filename);
            })
    }

    let onSetFileType = event => {
        setFileType(event.target.options[event.target.options.selectedIndex].value);
    }

    let onChangeHandler = event => {
        setSelectedFile(event.target.files[0]);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <form method="post" action="#" id="#">
                        <div className="form-group files">
                            <h1>Upload Your File </h1>
                            <input type="file" name="file" onChange={onChangeHandler}/>
                            <select name="fileType" onChange={onSetFileType}>
                                <option>jpeg</option>
                                <option>png</option>
                                <option>bmp</option>
                                <option>gif</option>
                            </select>
                            <button type="button" className="btn btn-success btn-block"
                                    onClick={onClickHandler}>Upload
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default App;
