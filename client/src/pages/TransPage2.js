// @flow
import React, {useEffect, useState} from 'react'
import '../App.css'
import {ActivityIndicator, ScrollView, View} from "react-native-web";
import {Observer} from "mobx-react-lite";
import {Button, Card, Divider, Input} from "antd";
import _ from 'lodash'
import {BlockOutlined, ReloadOutlined} from "@ant-design/icons";
import sharedService from "./SharedService";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import moment from "moment/moment";

export default function TransPage2(props: any,) {
    const [loading, setLoading] = useState(false);
    const [loading3, setLoading3] = useState(false);

    useEffect(() => {
        init()
    }, [])

    /**
     * todo: 웹소켓 연결..
     */
    useEffect(() => {
    }, []);


    async function init() {
        setLoading(true)
        const streamId = props.match.params.streamId
        await sharedService.getTransactionList(streamId);
        await sharedService.getAllWalletAddr(streamId)
        setLoading(false)
    }


    function renderForm() {
        return (
            <View style={{flexDirection: 'row', margin: 20}}>
                <View style={{flex: .7}}>
                    <Input
                        placeholder={`Enter the wallet address to be registered with this provider.`}
                        value={sharedService.inputWalletAddr}
                        onChange={e => {
                            sharedService.inputWalletAddr = e.target.value
                            //0xC79fD059814D44Be0670E8f06254AEEda1A80eca
                            console.log("walletAddr=====>", sharedService.inputWalletAddr);
                        }}

                    />
                </View>
                <View style={{width: 30,}}/>
                <View style={{flex: .3}}>
                    <Button
                        loading={loading3}
                        style={{backgroundColor: 'orange', border: 0,}}
                        type={'primary'}
                        onClick={async () => {
                            const streamId = props.match.params.streamId
                            await sharedService.addAddressToMorailsStream(sharedService.inputWalletAddr, streamId)
                        }}
                    >
                        Register
                    </Button>
                </View>
            </View>
        )
    }

    const renderButtons = () => {
        return (
            <View style={{flexDirection: 'row', marginVertical: 5}}>
                <View style={{flex: .15, marginHorizontal: 1}}>
                    <Button
                        type={'primary'}
                        onClick={() => window.location.reload(false)}>
                        <ReloadOutlined/> Reload page
                    </Button>
                </View>
                <View style={{flex: .2, marginHorizontal: 10}}>
                    <Button
                        type={'primary'}
                        onClick={() => {
                            let newList = []
                            sharedService.allList.map(item => {
                                if (item.confirmed.toString() === 'true') {
                                    newList.push(item)
                                }
                            })
                            console.log("newList===>", newList);
                            sharedService.filteredList = newList
                        }}
                    >
                        <BlockOutlined/> only confirmed block
                    </Button>
                </View>
                <View style={{flex: .2, marginHorizontal: 10}}>
                    <Button
                        type={'primary'}
                        onClick={() => {
                            let newList = []
                            sharedService.allList.map(item => {
                                if (item.confirmed.toString() === 'false') {
                                    newList.push(item)
                                }
                            })
                            console.log("newList===>", newList);
                            //setFilteredResults(newList)
                            sharedService.filteredList = newList
                        }}
                    >
                        <BlockOutlined/> only not confirmed block
                    </Button>
                </View>
                <View style={{height: 5,}}/>
            </View>
        )
    }

    return (
        <Observer>
            {() => (
                <View style={{backgroundColor: 'white', margin: 0, padding: 0,}}>
                    <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10,}}>
                        <View style={{flexDirection: 'row'}}>
                            <div style={{fontSize: 18}}> Tx monitoring logs for wallets registered in</div>
                            <div style={{color: 'navy', fontSize: 20, fontWeight: 'bold'}}>&nbsp;&nbsp;{sharedService.curProviderName}</div>
                        </View>
                        <View style={{height: 15,}}/>
                        <View style={{flexDirection: 'row'}}>
                            <div>
                                Moralis StreamId
                            </div>
                            <div style={{color: 'navy', fontSize: 20, fontWeight: 'bold'}}>&nbsp;&nbsp;&nbsp;{props.match.params.streamId}</div>
                        </View>
                        <Divider style={{borderColor: 'black'}}/>
                        <br/>
                        {loading3 && <ActivityIndicator size={'large'} color={'orange'}/>}
                        <br/>
                        <View>
                            <div style={{fontFamily: 'Roboto'}}>
                                List of wallets registered in the stream (provider)
                            </div>
                        </View>

                        <View style={{marginTop: 10,}}>
                            {!loading && sharedService.walletList.map((item, index) => {
                                return (
                                    <View style={{flexDirection: 'row'}} key={index.toString()}>
                                        <div style={{color: 'navy'}}>{index.toString()}</div>
                                        <View style={{width: 25}}/>
                                        <div style={{wordBreak: 'break-all',}}>{item}</div>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <br/>

                    <View style={{margin: 10,}}>
                        <Divider style={{borderColor: 'black'}}/>
                        {renderForm()}
                        <Divider style={{borderColor: 'black'}}/>
                    </View>

                    {loading ? <ActivityIndicator size={'large'} color={'orange'}/> :
                        <View style={{height: 900}}>
                            <View style={{height: 20,}}/>
                            {/*todo:renderTable*/}
                            {/*todo:renderTable*/}
                            {/*todo:renderTable*/}
                            {_.isEmpty(sharedService.filteredList) && <View>
                                <div> No Data</div>
                            </View>}
                            {!_.isEmpty(sharedService.filteredList) && sharedService.filteredList.map((item: TypeTransOne, index) => {
                                return (
                                    <View style={{marginVertical: -2}} key={index.toString()}>
                                        <Card title={`Hash : ${item.txsHash}`} bordered={false}
                                              style={{width: 'auto', backgroundColor: item.confirmed.toString() === 'true' ? 'orange' : 'pink', margin: 10, textAlign: 'left'}}>
                                            <p style={{wordBreak: 'break-all',}}><b>Hash: </b> {item.txsHash}</p>
                                            <View style={{flexDirection: 'row'}}>
                                                <View style={{flex: .5}}>
                                                    <p><b>createdAt : </b> {item.createdAt}</p>
                                                    <p><b>Time : </b> {moment.unix(item.block.timestamp).format("yyyy/MM/DD-HH:mm:ss")}</p>
                                                    <p style={{wordBreak: 'break-all', color: "red !important"}}><b>StreamId : </b> <b style={{color: 'navy', fontSize: 17}}>{item.streamId}</b></p>
                                                    <p><b>Block.number : </b> {item.block.number}</p>
                                                    <p><b>Confirmed :</b> {item.confirmed}</p>
                                                    <p><b>chainId :</b> {item.chainId}</p>
                                                </View>
                                                <View style={{flex: .5}}>
                                                    <p style={{wordBreak: 'break-all',}}><b>FromAddress : </b>{item.txs.fromAddress}</p>
                                                    <p style={{wordBreak: 'break-all',}}><b>ToAddress :</b> {item.txs.toAddress}</p>
                                                    <p><b>Value : </b>{sharedService.calcRealValue(item.txs.value)}</p>
                                                </View>
                                            </View>
                                        </Card>
                                    </View>
                                )
                            })}
                        </View>
                    }
                </View>
            )}
        </Observer>
    )
}
