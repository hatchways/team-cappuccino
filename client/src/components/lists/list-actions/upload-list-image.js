import React from 'react';
import DropZone from 'react-dropzone';
import axios from 'axios';



class ListImageUpload extends React.Component {
    state = {
        uploadedFiles: [],
        uploading: false
    }

    handleDropFile = files => {
        this.setState({ uploading: true });
        let formData = new FormData();
        const config = {
            header: { 'Content-Type': 'multipart/form-data'}
        };
        formData.append("listimage",files[0]);

        axios.post('/api/lists/uploadimage', formData, config)
        .then(res => {
            console.log(res.data);

            this.setState({
                uploading: false,
                uploadedFiles: [
                    ...this.state.uploadedFiles,
                    res.data
                ]
            }, () => {
                this.props.imagesHandler(this.state.uploadedFiles);
            });
        });
    }

    static getDerivedStateFromProps(props,state){
        if(props.reset){
            return state = {
                uploadedFiles:[]
            }
        }
        return null;
    }

    showUploadedImage = () => {
        this.state.uploadedFiles.map(list =>(
            <div className="dropzone_box"
                key={list.id}
                onClick={()=> this.onRemove(list.id)}
            >
                <div 
                    className="wrap"
                >
                </div>
            </div>
        ))
    }

    render(){
        return(
            <div>
                <div className="dropzone clear">
                    <DropZone
                        onDrop={this.handleDropFile}
                        multiple={false}
                        className="dropzone_box"
                    >

                    </DropZone>
                </div>
            </div>
        )
    }
}