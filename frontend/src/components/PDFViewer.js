// PDFViewer.js
import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

const PDFViewer = ({ pdfUrl }) => {
    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;

    return (
        <div style={styles.pdfContainer}>
            {pdfUrl ? (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <div
                        className="rpv-core__viewer"
                        style={{
                            border: '1px solid rgba(0, 0, 0, 0.3)',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                        }}
                    >
                        <div
                            style={{
                                alignItems: 'center',
                                backgroundColor: '#eeeeee',
                                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                padding: '4px',
                            }}
                        >
                            <Toolbar>
                                {(props) => {
                                    const {
                                        CurrentPageInput,
                                        Download,
                                        EnterFullScreen,
                                        GoToNextPage,
                                        GoToPreviousPage,
                                        NumberOfPages,
                                        Print,
                                        ShowSearchPopover,
                                        Zoom,
                                        ZoomIn,
                                        ZoomOut,
                                    } = props;
                                    return (
                                        <>
                                            <div style={{ padding: '0px 2px' }}>
                                                <ShowSearchPopover />
                                            </div>
                                            <div style={{ padding: '0px 2px' }}>
                                                <ZoomOut />
                                            </div>
                                            <div style={{ padding: '0px 2px' }}>
                                                <Zoom />
                                            </div>
                                            <div style={{ padding: '0px 2px' }}>
                                                <ZoomIn />
                                            </div>
                                            <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                                                <GoToPreviousPage />
                                            </div>
                                            <div style={{ padding: '0px 2px', width: '3rem' }}>
                                                <CurrentPageInput />
                                            </div>
                                            <div style={{ padding: '0px 6px' }}>
                                                / <NumberOfPages />
                                            </div>
                                            <div style={{ padding: '0px 2px' }}>
                                                <GoToNextPage />
                                            </div>
                                            <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                                                <EnterFullScreen />
                                            </div>
                                            <div style={{ padding: '0px 2px' }}>
                                                <Download />
                                            </div>
                                            <div style={{ padding: '0px 2px' }}>
                                                <Print />
                                            </div>
                                        </>
                                    );
                                }}
                            </Toolbar>
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <Viewer fileUrl={pdfUrl} plugins={[toolbarPluginInstance]} />
                        </div>
                    </div>
                </Worker>
            ) : (
                <p>Loading PDF...</p>
            )}
        </div>
    );
};

const styles = {
    pdfContainer: {
        marginBottom: '20px',
        height: '80vh', // Adjust this to control the height of the viewer
        overflow: 'hidden', // Hide overflow at container level
    },
};

export default PDFViewer;
