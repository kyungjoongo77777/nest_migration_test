// @flow
import React, {useEffect, useState} from 'react'
import '../App.css'
import {ActivityIndicator, Image, Text, TouchableOpacity, View} from "react-native-web";
import {Observer} from "mobx-react-lite";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {UserOutlined} from "@ant-design/icons";
import Input from "antd/es/input/Input";
import {Button, Divider, Popconfirm} from "antd";
import axios from "axios";
import {BACKEND_DEV_URI} from "../constants/FrontConstants";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import sharedService from "./SharedService";
import _ from 'lodash'
import {Helmet} from "react-helmet";

export default function ProviderPage() {
    const [filteredResults, setFilteredResults] = useState([]);

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        init()
    }, [])

    async function init() {
        fetchProvider()
    }

    async function fetchProvider() {

        setLoading(true)
        let res = await axios.get(BACKEND_DEV_URI + "/provider")

        console.log("datadatadata===>", res.data);
        setResults(res.data)
        setLoading(false)
    }

    const [providerName, setProviderName] = useState('');
    const history = useHistory()


    async function deleteStream(item) {
        try {

            setLoading(true)
            let res = await axios.delete(BACKEND_DEV_URI + "/provider/" + item.streamId)
            console.log("datadatadata===>", res.data);
            setResults(res.data)
            setLoading(false)
            await fetchProvider();
        } catch (e) {
            alert(e.toString())
        }
    }

    const addProvider = async () => {
        if (_.isEmpty(providerName)) {
            alert('프로바이더 네임을 입력하시오')
        } else {
            setLoading(true)
            let payload = {
                providerName: providerName,
                createAt: new Date(),
            };
            let res = await axios.post(BACKEND_DEV_URI + "/provider", payload)
            let data = res.data;
            await fetchProvider()
            setLoading(false)
        }
    }

    const handleClickProviderOne = (item) => {
        sharedService.walletList = [];
        sharedService.streamId = item.streamId;
        sharedService.curProviderName = item.providerName
        history.push('/trans/' + item.streamId)
    }


    return (
        <Observer>
            {() => (
                <View style={{backgroundColor: 'white', height: 600,}}>
                    <Helmet>
                        <meta charSet="utf-8"/>
                        <title>tx-monitor-and-notification-for-multiple-provider-prototyping</title>
                    </Helmet>
                    <View style={{margin: 5,}}>
                        <Image
                            source={{uri: 'data:image/png;base64,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'}}

                            style={{width: 200, height: 100,}}
                        />
                    </View>

                    <View style={{flexDirection: 'row', margin: 10}}>
                        <View style={{flex: .7}}>
                            <Input placeholder="Please, input game provider"
                                   onKeyPress={async (e) => {
                                       if (e.key === 'Enter') {
                                           await addProvider()
                                       }
                                   }}
                                   onChange={(e) => {
                                       console.log("target===>", e.target.value);
                                       setProviderName(e.target.value)
                                   }}
                                   prefix={<UserOutlined/>}/>
                        </View>
                        <View style={{width: 10,}}/>
                        <View style={{flex: .3}}>

                        </View>
                    </View>
                    <View style={{flexDirection: 'row', margin: 10}}>
                        <View style={{flex: .3}}>
                            <Button type={'primary'} onClick={() => addProvider()}>
                                등록
                            </Button>
                        </View>
                        <View style={{flex: .7}}/>
                    </View>
                    <Divider style={{borderColor: 'black'}}/>
                    <View style={{flexDirection: 'flex-start'}}>
                        <Text style={{textAlign: 'left', fontSize: 20,}}>&nbsp;&nbsp;  Game Provider List </Text>
                    </View>
                    <Divider style={{borderColor: 'black'}}/>
                    <View style={{flexDirection: 'row', backgroundColor: 'orange', marginTop: -24, height: 40,}}>
                        <View style={{flex: .3, alignSelf: 'center'}}>
                            <div>Game Provider</div>
                        </View>
                        <View style={{flex: .4, alignSelf: 'center'}}>
                            <div>Moralis stream ID</div>
                        </View>
                        <View style={{flex: .4, alignSelf: 'center'}}>
                            <div>CreatedAt</div>
                        </View>
                        <View style={{flex: .1, alignSelf: 'center'}}>
                            <div>Del</div>
                        </View>
                    </View>
                    {loading && <View style={{marginTop: 10,}}>
                        <ActivityIndicator size={'large'} color={'orange'}/>
                    </View>}

                    {!loading && results.map((item, index) => {
                        return (
                            <View style={{height: 'auto',}}>
                                <View style={{flexDirection: 'row', backgroundColor: '#ded1d1', padding: 7, margin: 2,}}>
                                    <TouchableOpacity
                                        onPress={() => handleClickProviderOne(item)}
                                        style={{flex: .3, wordBreak: 'break-all',}}>
                                        <div style={{wordBreak: 'break-all',}}>{item.providerName}</div>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleClickProviderOne(item)}
                                        style={{flex: .4}}>
                                        <div>{item.streamId}</div>
                                    </TouchableOpacity>
                                    <View style={{flex: .4}}>
                                        <div>{item.createAt}</div>
                                    </View>

                                    {/*todo: delete*/}
                                    {/*todo: delete*/}
                                    {/*todo: delete*/}
                                    <Popconfirm
                                        title="Delete the provider"
                                        description="Are you sure to delete this provider?"
                                        onConfirm={() => deleteStream(item)}
                                        onCancel={() => {

                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type='link'
                                                style={{flex: .05}}>
                                            <div style={{color: 'orange'}}>X</div>
                                        </Button>
                                    </Popconfirm>

                                </View>
                            </View>
                        )
                    })}

                </View>

            )}
        </Observer>
    )
}
