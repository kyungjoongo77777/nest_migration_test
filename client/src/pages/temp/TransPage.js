// @flow
import React, {useEffect, useState} from 'react'
import '../../App.css'
import {ActivityIndicator, ScrollView, View} from "react-native-web";
import {Observer} from "mobx-react-lite";
import {Button, Divider, Input} from "antd";
import BootstrapTable from 'react-bootstrap-table-next';
import _ from 'lodash'
import {BlockOutlined, ReloadOutlined} from "@ant-design/icons";
import {columns} from "./TableColumn";
import sharedService from "../SharedService";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export default function TransPage(props: any,) {
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


    function renderTable() {
        return (
            <ScrollView>
                <BootstrapTable
                    style={{border: 1,}}
                    className="tableContainer" keyField='key' data={sharedService.filteredList}
                    columns={columns}
                />
                {!loading && _.isEmpty(sharedService.filteredList) && <View style={{marginTop: 10,}}>
                    <div style={{fontSize: 20}}>No Data</div>
                </View>}
            </ScrollView>
        )
    }

    function renderForm() {
        return (
            <View style={{flexDirection: 'row'}}>
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
                <View style={{backgroundColor: 'white', margin: 0, padding: 25,}}>
                    <View style={{justifyContent: 'flex-start', alignItems: 'flex-start',}}>
                        <View style={{flexDirection: 'row'}}>
                            <div style={{fontSize: 18}}> Tx monitoring logs for wallets registered in</div>
                            <div style={{color: 'navy', fontSize: 20, fontWeight: 'bold'}}>&nbsp;&nbsp;{sharedService.curProviderName}</div>
                        </View>

                        <br/>
                        {loading3 && <ActivityIndicator size={'large'} color={'orange'}/>}
                        <br/>
                        <View>
                            <div style={{fontFamily: 'Roboto'}}>
                                List of wallets registered in the stream (provider)
                            </div>
                        </View>
                        {!loading && sharedService.walletList.map((item, index) => {
                            return (
                                <View style={{flexDirection: 'row'}}>
                                    <div style={{color: 'navy'}}>{index.toString()}</div>
                                    <View style={{width: 25}}/>
                                    <div>{item}</div>
                                </View>
                            )
                        })}
                    </View>
                    <br/>
                    <Divider style={{borderColor: 'black'}}/>
                    {renderForm()}
                    <Divider style={{borderColor: 'black'}}/>
                    {loading ? <ActivityIndicator size={'large'} color={'orange'}/> :
                        <View style={{height: 900}}>
                            {renderButtons()}
                            <View style={{height: 20,}}/>
                            {/*todo:renderTable*/}
                            {renderTable()}
                        </View>
                    }
                </View>
            )}
        </Observer>
    )
}
