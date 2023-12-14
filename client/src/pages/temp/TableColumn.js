import {Image, TouchableOpacity, View} from "react-native-web";
import ehterIcon from "../../assets/ehter_icon.png";
import moment from "moment";
import ReactJson from "react-json-view";
import React from 'react';

export const columns = [
    {

        dataField: "",
        text: 'Index',
        headerStyle: (colum, colIndex) => {
            return {
                width: '5%',
                textAlign: 'center',
                backgroundColor: 'orange',
                fontSize: 14,
                wordBreak: 'break-all',
                borderStyle: 'solid',
                borderWidth: 1,
            };
        },
        style: {
            padding: '0px'
        },
        formatter: (cell, row, rowIndex) => {
            return (
                rowIndex.toString()
            )
        }
    },

    {

        dataField: "",
        text: 'E-Scan',
        headerStyle: (colum, colIndex) => {
            return {
                width: '5%',
                textAlign: 'center',
                backgroundColor: 'orange',
                fontSize: 14,
                wordBreak: 'break-all',
                borderStyle: 'solid',
                borderWidth: 1,
            };
        },
        style: {
            padding: '0px'
        },
        formatter: (cell, row, rowIndex) => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        let _hash = row.txs[0].hash
                        let url = 'https://sepolia.etherscan.io/tx/' + _hash
                        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
                    }}
                    style={{backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', marginTop: 7,}}

                >
                    <View style={{marginLeft: 10,}}>
                        <Image source={ehterIcon} style={{width: 20, height: 20,}}/>
                    </View>
                </TouchableOpacity>
            )
        }
    },
    {
        dataField: 'streamId',
        text: 'streamId',
        headerStyle: (colum, colIndex) => {
            return {
                width: '10%',
                textAlign: 'center',
                backgroundColor: 'orange',
                fontSize: 14,
                wordBreak: 'break-all',
                borderStyle: 'solid',
                borderWidth: 1,
            };
        },
        style: {
            padding: '0px', wordBreak: 'break-all',
        },
    },
    {
        dataField: 'chainId',
        text: 'chainId',
        headerStyle: (colum, colIndex) => {
            return {
                width: '10%',
                textAlign: 'center',
                backgroundColor: 'orange',
                fontSize: 14,
                wordBreak: 'break-all',
                borderStyle: 'solid',
                borderWidth: 1,
            };
        },
        style: {
            padding: '0px', wordBreak: 'break-all',
        },
    },
    {
        dataField: 'confirmed',
        text: 'confirmed',
        headerStyle: (colum, colIndex) => {
            return {
                width: '10%',
                textAlign: 'center',
                backgroundColor: 'orange',
                fontSize: 14,
                wordBreak: 'break-all',
                borderStyle: 'solid',
                borderWidth: 1,
            };
        },
        style: {
            padding: '0px', wordBreak: 'break-all',
        }
    },
    {
        dataField: 'block.number',
        text: 'block.number',
        //formatter
        headerStyle: (colum, colIndex) => {
            return {
                width: '10%',
                backgroundColor: 'orange',
                textAlign: 'center',
                fontSize: 14,
                wordBreak: 'break-all', borderStyle: 'solid',
                borderWidth: 1,
            };
        },
        style: {
            padding: '0px', wordBreak: 'break-all'
        },
    },
    //todo: block.timestamp
    {
        dataField: 'block.timestamp',
        text: 'block.time',
        //formatter
        headerStyle: (colum, colIndex) => {
            return {
                width: '10%',
                backgroundColor: 'orange',
                borderStyle: 'solid',
                borderWidth: 1,
                textAlign: 'center',
                fontSize: 14,
                flexWrap: 'flex',
                wordBreak: 'break-all'
            };
        },
        style: {
            padding: '0px', wordBreak: 'break-all',
        },
        //
        formatter: (cell, row, rowIndex) => {
            const timestampObj = moment.unix(cell);
            const result = timestampObj.format("yyyy/MM/DD-HH:mm:ss")
            console.log(result);
            return result
        },
    },
    {
        dataField: 'block',
        text: 'block',
        style: {
            padding: '0px'
        },
        headerStyle: (colum, colIndex) => {
            return {
                width: '350px', backgroundColor: 'orange', textAlign: 'center', fontSize: 14, borderStyle: 'solid',
                borderWidth: 1,
            };
        },
        formatter: (cell, row, rowIndex) => {
            return <View style={{wordBreak: 'break-all'}}>
                <ReactJson
                    theme={'harmonic'}
                    displayDataTypes={false}
                    collapsed={true}
                    style={{
                        textAlign: 'left',
                    }}
                    src={cell}/>
            </View>
        }
    },
    {
        dataField: 'txs[0]',
        text: 'txs',
        headerStyle: (colum, colIndex) => {
            return {
                width: '350px', backgroundColor: 'orange', textAlign: 'center', fontSize: 14, borderStyle: 'solid',
                borderWidth: 1,
            };
        },
        formatter: (cell, row, rowIndex) => {
            return <View style={{wordBreak: 'break-all'}}>
                <ReactJson
                    theme={'summerfruit'}
                    displayDataTypes={false}
                    collapsed={true}
                    style={{
                        textAlign: 'left',
                    }}
                    src={cell}/>
            </View>
        },
        style: {
            padding: '0px'
        }
    },
    {
        dataField: 'erc20Transfers[0]',
        text: 'erc20Transfers',
        headerStyle: (colum, colIndex) => {
            return {
                width: '350px', backgroundColor: 'orange', textAlign: 'center', fontSize: 14, borderStyle: 'solid',
                borderWidth: 1,
            };
        },
        formatter: (cell, row, rowIndex) => {
            return <View style={{wordBreak: 'break-all'}}>
                <ReactJson
                    theme={'summerfruit'}
                    displayDataTypes={false}
                    collapsed={true}
                    style={{
                        textAlign: 'left',
                    }}
                    src={cell}/>
            </View>
        },
        style: {
            padding: '0px'
        }
    },
];
