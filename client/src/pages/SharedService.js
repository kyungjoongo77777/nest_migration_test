import {makeAutoObservable} from "mobx";
import {notification} from "antd";
import axios from "axios";
import {BACKEND_DEV_URI} from "../constants/FrontConstants.js";
import Moralis from "moralis";

class SharedService {

    constructor() {
        makeAutoObservable(this)
    }

    numbers = []
    selectedIndex = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,];
    counter = 0;
    currentSelectedNumberRow = []
    selectedNumberCount = 0;
    completedRows = []
    curProviderName = ''
    streamId = '';
    filteredList = []
    allList = []
    inputWalletAddr = ''
    walletList = [];


    showToast(text) {
        notification.open({
            message: text,
            /*description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',*/
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    }

    async insertLottery(lotteryOne) {
        await axios.post(BACKEND_DEV_URI + '/lotteries', {
            "numbers": lotteryOne,
            "publishedDate": new Date().toISOString(),
            "isPurchase": 'true',
        })
    }

    async getLotteryList() {
        let _results = await axios.get(BACKEND_DEV_URI + "/lotteries")
        console.log("=====>", _results);
        return _results.data;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    async deleteAllLotteries() {
        await axios.delete(BACKEND_DEV_URI + '/lotteries')
    }


    allResults = []
    filteredResults = []

    async getTransactionList(streamId) {
        try {
            let data = await axios.get(BACKEND_DEV_URI + "/trans/" + streamId)
            let result = data.data;
            let newResults = []
            let confirmCount = 0;
            for (let index = 0; index < result.length; index++) {
                if (result[index].confirmed.toString() === 'true') {
                    confirmCount++
                }
                // let dataOne = {
                //     chainId: result[index].chainId,
                //     confirmed: result[index].confirmed,
                //     blockNumber: result[index].block.number,
                //     streamId: result[index].streamId,
                //     block: result[index].block,
                //     txs: result[index].txs,
                //     erc20Transfers: result[index].erc20Transfers
                //     //key: result[index].confirmed + result[index].txs[0].hash
                // }
                newResults.push(result[index])
            }

            console.log("newResults===>", newResults);
            this.allList = newResults;
            this.filteredList = newResults
            sharedService.allList = newResults
            sharedService.filteredList = newResults
        } catch (e) {
            alert(e.toString())
        }

    }


    async getAllWalletAddr(streamId) {
        try {
            const response = await Moralis.Streams.getAddresses({
                id: streamId,
                limit: 100,
            });
            console.log("sldkflsdkf===>", response.toJSON().result);
            let _results = response.toJSON().result
            let tempList = []
            for (let i = 0; i < _results.length; i++) {
                console.log("_results=====>", _results[i].address);

                tempList.push(_results[i].address)
            }

            sharedService.walletList = tempList;
            console.log("=====>", JSON.parse(JSON.stringify(sharedService.walletList)));
        } catch (e) {
            //alert(e.toString())
        }
    }

    calcRealValue(sep) {
        let result = sep / 1000000000000000000

        return result
    }


    async addAddressToMorailsStream(address, streamId) {
        try {
            let result = await Moralis.Streams.addAddress({address: address, id: streamId});
            //alert(JSON.stringify(result) + "address 등록 성공")
            notification.open({
                message: 'Notification',
                description:
                    JSON.stringify(result) + " wallet addr 등록 성공",
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });

            await this.getAllWalletAddr(streamId);
            sharedService.inputWalletAddr = '';

        } catch (e) {
            alert(e.toString() + " address 등록 실패")
            sharedService.inputWalletAddr = '';
        }
    }


}

const sharedService = new SharedService();

export default sharedService;


//
// {
//     //setWebSocket()
//     // function onConnect() {
//     //     console.log("onConnect===>");
//     // }
//     //
//     // function onDisconnect() {
//     //     console.log("onDisconnect===>");
//     // }
//     //
//     // socket.on('connect', onConnect);
//     // socket.on('disconnect', onDisconnect);
//     //
//     // socket.on('newTransaction', (txOne) => {
//     //     let _tempTxList = sharedService.allList
//     //     //todo:기존 데이터 업데이투인 경우..
//     //     console.log("=txOne====>", txOne);
//     //     if (txOne.isUpdate.toString() === 'true') {
//     //         let index = _tempTxList.findIndex(o => o.block.number === txOne.block.number);
//     //         _tempTxList[index] = {}
//     //         _tempTxList[index] = txOne
//     //         sharedService.showToast(txOne.block.number + '블록이 블록에 confirmed 되었습니다!!')
//     //     } else {
//     //         _tempTxList.push(txOne)
//     //         sharedService.showToast(txOne.block.number + '블록이 등록되었습니다!!')
//     //     }
//     //     sharedService.filteredList = _tempTxList;
//     // });
//     //
//     // //0xF7D076A408708E0871Ac1CbDF7Bf6c858edeBb80 : todo : justin
//     //
//     // return () => {
//     //     socket.off('connect', onConnect);
//     //     socket.off('disconnect', onDisconnect);
//     // };
// }
