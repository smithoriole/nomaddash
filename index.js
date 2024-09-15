

let dccRevenue
let dccPayout
let dccCat
let dccRevenueHTML = document.getElementById("dccRevenue")
let dccPayoutHTML = document.getElementById("dccPayout")
let dccCatHTML = document.getElementById("dccCat")


let totalRevenue
let totalPayout
let totalCat
let totalRevenueHTML = document.getElementById("totalRevenue")
let totalPayoutHTML = document.getElementById("totalPayout")
let totalCatHTML = document.getElementById("totalCat")

let catsOwnedDiv = document.getElementById("catsOwnedDiv")
let catsOwned = document.getElementById("catsOwned")

let floorPrice
let totalFloorPrice
let floor = document.getElementById("floor")

let eligibleInput = document.getElementById("eligible")
let eligibleBtn = document.getElementById("eligibleBtn")
let eligibleConfirmation = document.getElementById("eligibleConfirmation")

function reset(){
  let date = new Date()
  let a = date.getDay()
  let b = 0
  let first
	if(a==4 || a==5 || a==6){
    		first = (date.getDate() - date.getDay()) +4;
    }
	else if(a>0 && a<4){first = (date.getDate() - date.getDay()) -3;
	}
    else{
    		first = (date.getDate() - date.getDay()) -3;
    }
    
    let saturday = new Date(date.setDate(first)).toUTCString()
    let test = new Date(saturday).toISOString()
    let test2 = test.substring(0,10)
    let test3 = `${test2}T00:00:00.000Z`
    return test3
  }


function getDCC() {
    fetch("http://localhost:10000/dcc")
        .then(res => res.json())
        .then(data => {
            // Ensure data contains balance1 and balance2
            if (data.balance1 !== undefined && data.balance2 !== undefined) {
                const balance1 = data.balance1;
                const balance2 = data.balance2;

                // Perform calculations
                const dccRevenue = (((balance1 / 1000000000) + (balance2 / 1000000000)) * 0.7);
                const dccPayout = (dccRevenue * 0.44) / 20000;
                const catsOwned = parseFloat(localStorage.getItem("catsOwned")) || 0; // Default to 0 if not set
                const dccCat = dccPayout * catsOwned;

                // Update HTML elements
                dccRevenueHTML.textContent = `${dccRevenue.toFixed(4)} Sol`;
                dccPayoutHTML.textContent = `${dccPayout.toFixed(4)} Sol`;
                dccCatHTML.textContent = `${dccCat.toFixed(4)} Sol`;
            } else {
                console.error("Invalid data received from server");
            }
        })
        .catch(error => {
            console.error("Error fetching DCC data:", error);
        });
}






function getTOTAL() {
    totalRevenue = dccRevenue 
    totalPayout = dccPayout 
    totalCat = totalPayout * localStorage.getItem("catsOwned")

    totalRevenueHTML.textContent = `${totalRevenue.toFixed(4)} Sol`
    totalPayoutHTML.textContent = `${totalPayout.toFixed(4)} Sol`
    totalCatHTML.textContent = `${totalCat.toFixed(4)} Sol`
}

function getFLOOR() {
    fetch("https://cors-get-proxy.sirjosh.workers.dev/?url=https://api-mainnet.magiceden.io/rpc/getCollectionEscrowStats/degenfatcats?edge_cache=true", {
        method: 'GET',
        redirect: 'follow',
    })
        .then(res => res.json())
        .then(data => {
            floorPrice = data.results.floorPrice / 1000000000
            totalFloorPrice = floorPrice * localStorage.getItem("catsOwned")
            floor.innerHTML = `<p>Your total cat value is <u>${totalFloorPrice.toFixed(2)} Sol</u> at <u>${floorPrice.toFixed(2)} Sol</u> per cat</p>`
        })
}

function jackpot() {
    let totalVolume = 0
    let jackpot = 0
    let jackpotTotal = 0

    let date = new Date()
    let first = date.getDate() - (date.getDay() + 1);
    let saturday = new Date(date.setDate(first)).toUTCString()
    let test = new Date(saturday).toISOString()
    let test2 = test.substring(0,10)
    let test3 = `${test2}T00:00:00.000Z`
    fetch(`https://api.helius.xyz/v0/addresses/jpotSBs8opQ4xGDn2xbRQS4eChNG5w4kxEeS1Rx9tyg/balances?api-key=eff3cc4b-32f2-47d0-b6a0-ae82a5ba3159`)
    .then(res2 => res2.json())
    .then(data2 => {
        jackpotTotal = jackpot + (data2.nativeBalance / 1000000000)
        let NEWJACKPOT = (data2.nativeBalance / 1000000000)

        document.querySelector(".dcfjpot").innerHTML = `                      
           ${NEWJACKPOT.toFixed(2)}◎
            
        `
    })

    fetch(`https://damp-ocean-83908.fly.dev/https://api.degencoinflip.com/v2/dashboard/top-gains?startTime=${test3}&limit=10000&showAll=true`)
        .then(res => res.json())
        .then(data => {
            for (let item of data.payload.items) {
                totalVolume += item.total
                jackpot = ((totalVolume * 0.035) * 0.2428) * 0.05
            }

        })
}

function dozerJackpot(){

    fetch(`https://api.helius.xyz/v0/addresses/GRrkVGTegDVz5sszrWtVyhopmyiDwYie2QDaQwKcjVxc/balances?api-key=eff3cc4b-32f2-47d0-b6a0-ae82a5ba3159`)
    .then(res2 => res2.json())
    .then(data2 => {
        //let dozerjackpotTotal = jackpot + (data2.nativeBalance / 1000000000)
        let dozerJackpot = (data2.nativeBalance / 1000000000)
        

        document.querySelector(".dozerjpot").innerHTML = `                      
            ${dozerJackpot.toFixed(2)}◎
            
        `
    })

}
function miniJackpot(){

    fetch(`https://api.helius.xyz/v0/addresses/EcinyDeHV8Le3nBZZV52tGyrNpePxawBNzQmnUpY1x6m/balances?api-key=eff3cc4b-32f2-47d0-b6a0-ae82a5ba3159`)
    .then(res2 => res2.json())
    .then(data2 => {
        //let dozerjackpotTotal = jackpot + (data2.nativeBalance / 1000000000)
        let miniJackpot = (data2.nativeBalance / 1000000000)
        

        document.querySelector(".minijpot").innerHTML = `                      
            ${miniJackpot.toFixed(2)}◎
            
        `
    })

}
function charity(){

    fetch(`https://api.helius.xyz/v0/addresses/7X5mDEAtJwDHzgA8ztJDbRDJyhePHNftx19AwNoU4QqZ/balances?api-key=eff3cc4b-32f2-47d0-b6a0-ae82a5ba3159`)
    .then(res2 => res2.json())
    .then(data2 => {
        //let dozerjackpotTotal = jackpot + (data2.nativeBalance / 1000000000)
        let charity = (data2.nativeBalance / 1000000000)
        

        document.querySelector(".charity").innerHTML = `                      
            ${charity.toFixed(2)}◎
            
        `
    })

}



catsOwned.value = localStorage.getItem("catsOwned")

catsOwnedDiv.addEventListener("change", function(e) {
    localStorage.setItem("catsOwned", e.target.value)
    getDCF()
    getDCC()
    /*getDCD()*/
    getDS()
    getinsurance()
    getFLOOR()
    setTimeout(getTOTAL, 1500)
}) 

/* eligibleBtn.addEventListener("click", function() {
    let wallet = eligibleInput.value
    if (eligibleInput.value.length >= 32 && eligibleInput.value.length <= 44) {
        fetch(`https://damp-ocean-83908.fly.dev/https://jp7ylm6bad.execute-api.us-east-2.amazonaws.com/prod/wallets/${wallet}/nonce?x=gn&referral=goldennomads`)
        .then(res => res.json())
        .then(data => {
            let referral = data.payload.referral
            if (referral === "goldennomads") {
                eligibleConfirmation.innerHTML = `
                <p style="color: green">${wallet} is eligible</p>
                `
            } else {
                eligibleConfirmation.innerHTML = `
                <p style="color: red">${wallet} is not eligible</p>
                `
            }
        })
        eligibleInput.value = ""
    } else {
        eligibleConfirmation.innerHTML = `
        <p style="color: red">${wallet} is not eligible</p>
        `
        eligibleInput.value = ""
    }
}) */

function render() {
    miniJackpot()
    jackpot()
    dozerJackpot()
    charity()
    getDCF()
    /*getDCD()*/
    getDCC()
    getDS()
    getinsurance()
    setTimeout(getTOTAL, 1500)
    getFLOOR()
    setTimeout(render, 10000)
}

render()

let dcfleaderboard = document.getElementById("dcfleaderboard")
let dozerleaderboard = document.getElementById("dozerleaderboard")

function compareNumbers(a, b) {
    return a - b;
  }
  
let dcfleaderboardHTML = ``
let dozerleaderboardHTML = ``
let array = []

// GAIN
function dcfgetTopGains() {

    let test3 = reset();

    fetch(`https://damp-ocean-83908.fly.dev/https://api.degencoinflip.com/v2/dashboard/top-gains?startTime=${test3}&limit=10000&showAll=true`)
    .then(res => res.json())
    .then(data => {
        let count = data.payload.items.length;
        dcfleaderboardHTML = ``
        for (let i = 0; i < 10 && i < count; i++) {
            if (data.payload.items[i].nickname) {
                dcfleaderboardHTML += `
                <div class="leaderboardItem">
                    <p class="leaderboardPosition">${i+1}.</p>
                    <div class="leaderboardItems">
                        <p class="leaderboardWallet"><a href="https://solscan.io/account/${data.payload.items[i].walletId}" target="_blank">${data.payload.items[i].nickname}</a></p>
                        <p class="leaderboardGains">${data.payload.items[i].netGains.toFixed(2)}</p>
                    </div>
                </div>
            `
            } else {
                dcfleaderboardHTML += `
                <div class="leaderboardItem">
                    <p class="leaderboardPosition">${i+1}.</p>
                    <div class="leaderboardItems">
                        <p class="leaderboardWallet"><a href="https://solscan.io/account/${data.payload.items[i].walletId}" target="_blank">${data.payload.items[i].walletId}</a></p>
                        <p class="leaderboardGains">${data.payload.items[i].netGains.toFixed(2)}</p>
                    </div>
                </div>
            `
            }
        }
        dcfleaderboard.innerHTML = dcfleaderboardHTML
    })

}
function dozergetTopGains() {

    let date = new Date();
    let start = date.getDate() - (date.getDay() +2);
    let startString = new Date(date.setDate(start)).toUTCString();
    let satString = new Date(startString).toISOString();
    let startDate = reset();


    let today = new Date();
    today.setDate(today.getDate() + 1);
    let tomorrow = today.toISOString().split('T')[0];

    let apiLink = "https://damp-ocean-83908.fly.dev/https://api.degencoindozer.com/v1/rankings?startTime="+startDate+"&dao=goldennomads&endTime="+tomorrow;
    

    fetch(apiLink)
        .then(res => res.json())
        .then(data => {
       
        dozerleaderboardHTML = ``
        array = []
        let lamport = 1000000000
        for (let payload of data.payload) {
            array.push({gains: payload.gains/lamport, wallet: payload.owner})         
        }
        array.sort((a, b) => b.gains - a.gains)
        let count = data.payload.length;
        

        for(let i = 0; i < count && i < 10 ; i++){
            let profit = array[i].gains;
            let owner = array[i].wallet;

            if(owner){  
                                            
                        dozerleaderboardHTML += `
                        <div class="leaderboardItem">
                            <p class="leaderboardPosition">${i+1}.</p>
                            <div class="leaderboardItems">
                                <p class="dozerleaderboardWallet"></p>
                                <p class="leaderboardGains">${profit.toFixed(2)}</p>
                            </div>
                        </div>
                        `
            }
            else{
                        dozerleaderboardHTML += `
                            <div class="leaderboardItem">
                                <p class="leaderboardPosition">${i+1}.</p>
                                <div class="leaderboardItems">
                                    <p class="dozerleaderboardWallet"><a href="https://solscan.io/account/${owner}" target="_blank">${owner}</a></p>
                                    <p class="leaderboardGains">${profit.toFixed(2)}</p>
                                </div>
                            </div>
                        `
            }


            getNickname(owner).then (function(result) {
                let nickname = result;                
                var elements = document.getElementsByClassName('dozerleaderboardWallet');  
                elements[i].innerHTML = `<a href="https://solscan.io/account/${owner}" target="_blank">${nickname}</a>`
                          
            })                     
        }       
        dozerleaderboard.innerHTML = dozerleaderboardHTML
        
        })   
    }

    function dozergetTopVolume() {

        let date = new Date();
        let start = date.getDate() - (date.getDay() +2);
        let startString = new Date(date.setDate(start)).toUTCString();
        let satString = new Date(startString).toISOString();
        let startDate = reset();
    
    
        let today = new Date();
        today.setDate(today.getDate() + 1);
        let tomorrow = today.toISOString().split('T')[0];
    
        let apiLink = "https://damp-ocean-83908.fly.dev/https://api.degencoindozer.com/v1/rankings?startTime="+startDate+"&dao=goldennomads&endTime="+tomorrow;
        
    
        fetch(apiLink)
            .then(res => res.json())
            .then(data => {
           
            dozerleaderboardHTML = ``
            array = []
            let lamport = 1000000000
            for (let payload of data.payload) {
                array.push({volume: payload.volume/lamport, wallet: payload.owner})         
            }
            array.sort((a, b) => b.volume - a.volume)
            let count = data.payload.length;
            
    
            for(let i = 0; i < count && i < 10 ; i++){
                let volume = array[i].volume;
                let owner = array[i].wallet;
    
                if(owner){  
                                                
                            dozerleaderboardHTML += `
                            <div class="leaderboardItem">
                                <p class="leaderboardPosition">${i+1}.</p>
                                <div class="leaderboardItems">
                                    <p class="dozerleaderboardWallet"></p>
                                    <p class="leaderboardGains">${volume.toFixed(2)}</p>
                                </div>
                            </div>
                            `
                }
                else{
                                dozerleaderboardHTML += `
                                <div class="leaderboardItem">
                                    <p class="leaderboardPosition">${i+1}.</p>
                                    <div class="leaderboardItems">
                                        <p class="dozerleaderboardWallet"><a href="https://solscan.io/account/${owner}" target="_blank">${owner}</a></p>
                                        <p class="leaderboardGains">${profit.toFixed(2)}</p>
                                    </div>
                                </div>
                            `
                }
    
    
                getNickname(owner).then (function(result) {
                    let nickname = result;                
                    var elements = document.getElementsByClassName('dozerleaderboardWallet');  
                    elements[i].innerHTML = `<a href="https://solscan.io/account/${owner}" target="_blank">${nickname}</a>`
                })                     
            }       
            dozerleaderboard.innerHTML = dozerleaderboardHTML
            
            })   
        }

        function dozerCoins() {

            let date = new Date();
            let start = date.getDate() - (date.getDay() +2);
            let startString = new Date(date.setDate(start)).toUTCString();
            let satString = new Date(startString).toISOString();
            let startDate = reset();
        
        
            let today = new Date();
            today.setDate(today.getDate() + 1);
            let tomorrow = today.toISOString().split('T')[0];
        
            let apiLink = "https://damp-ocean-83908.fly.dev/https://api.degencoindozer.com/v1/rankings?startTime="+startDate+"&dao=goldennomads&endTime="+tomorrow;
            
        
            fetch(apiLink)
                .then(res => res.json())
                .then(data => {
               
                dozerleaderboardHTML = ``
                array = []
                let lamport = 1000000000
                for (let payload of data.payload) {
                    array.push({coins: payload.coins, wallet: payload.owner})         
                }
                array.sort((a, b) => b.coins - a.coins)
                let count = data.payload.length;
                
        
                for(let i = 0; i < count && i < 10 ; i++){
                    let coins = array[i].coins;
                    let owner = array[i].wallet;
        
                    if(owner){  
                                                    
                                dozerleaderboardHTML += `
                                <div class="leaderboardItem">
                                    <p class="leaderboardPosition">${i+1}.</p>
                                    <div class="leaderboardItems">
                                        <p class="dozerleaderboardWallet"></p>
                                        <p class="leaderboardGains">${coins}</p>
                                    </div>
                                </div>
                                `
                    }
                    else{
                                    dozerleaderboardHTML += `
                                    <div class="leaderboardItem">
                                        <p class="leaderboardPosition">${i+1}.</p>
                                        <div class="leaderboardItems">
                                            <p class="dozerleaderboardWallet"><a href="https://solscan.io/account/${owner}" target="_blank">${owner}</a></p>
                                            <p class="leaderboardGains">${profit.toFixed(2)}</p>
                                        </div>
                                    </div>
                                `
                    }
        
        
                    getNickname(owner).then (function(result) {
                        let nickname = result;                
                        var elements = document.getElementsByClassName('dozerleaderboardWallet');  
                        elements[i].innerHTML = `<a href="https://solscan.io/account/${owner}" target="_blank">${nickname}</a>`
                                  
                    })                     
                }       
                dozerleaderboard.innerHTML = dozerleaderboardHTML
                
                })   
            }
        
    async function getNickname(owner){   
        let url="https://damp-ocean-83908.fly.dev/https://api.degenpersonas.com/v1/profiles/"
     
        const res = await fetch(url + owner)
        const data = await res.json()
        let nickname = data.payload.nickname
        return nickname
        
    }

// VOLUME
function dcfgetTopVolume() {

    let test3 = reset();

    fetch(`https://damp-ocean-83908.fly.dev/https://api.degencoinflip.com/v2/dashboard/top-gains?startTime=${test3}&limit=10000&showAll=true`)
    .then(res => res.json())
    .then(data => {
        dcfleaderboardHTML = ``
        array = []

        for (let items of data.payload.items) {
            array.push({volume: items.total, wallet: items.walletId, name: items.nickname})
        }
        array.sort((a, b) => b.volume - a.volume)
       
        let count = data.payload.items.length;
        for (let i = 0; i < 10 && i < count; i++) {
            if (array[i].name) {
                dcfleaderboardHTML += `
                <div class="leaderboardItem">
                    <p class="leaderboardPosition">${i+1}.</p>
                    <div class="leaderboardItems">
                        <p class="leaderboardWallet"><a href="https://solscan.io/account/${array[i].wallet}" target="_blank">${array[i].name}</a></p>
                        <p class="leaderboardGains">${array[i].volume.toFixed(2)}</p>
                    </div>
                </div>
            `
            } else {
                dcfleaderboardHTML += `
                <div class="leaderboardItem">
                    <p class="leaderboardPosition">${i+1}.</p>
                    <div class="leaderboardItems">
                        <p class="leaderboardWallet"><a href="https://solscan.io/account/${array[i].wallet}" target="_blank">${array[i].name}</a></p>
                        <p class="leaderboardGains">${array[i].volume.toFixed(2)}</p>
                    </div>
                </div>
            `
            }
        }
        dcfleaderboard.innerHTML = dcfleaderboardHTML
    })

}

// FLIP
function dcfgetTopFlips() {


    let test3 = reset();

    fetch(`https://damp-ocean-83908.fly.dev/https://api.degencoinflip.com/v2/dashboard/top-gains?startTime=${test3}&limit=10000&showAll=true`)
    .then(res => res.json())
    .then(data => {
        dcfleaderboardHTML = ``
        array = []

        for (let items of data.payload.items) {
            array.push({flips: items.totalFlips, wallet: items.walletId, name: items.nickname})
        }
        array.sort((a, b) => b.flips - a.flips)
      

        let count = data.payload.items.length;
        for (let i = 0; i < 10 && i < count; i++) {
            if (array[i].name) {
                dcfleaderboardHTML += `
                <div class="leaderboardItem">
                    <p class="leaderboardPosition">${i+1}.</p>
                    <div class="leaderboardItems">
                        <p class="leaderboardWallet"><a href="https://solscan.io/account/${array[i].wallet}" target="_blank">${array[i].name}</a></p>
                        <p class="leaderboardGains">${array[i].flips}</p>
                    </div>
                </div>
            `
            } else {
                dcfleaderboardHTML += `
                <div class="leaderboardItem">
                    <p class="leaderboardPosition">${i+1}.</p>
                    <div class="leaderboardItems">
                        <p class="leaderboardWallet"><a href="https://solscan.io/account/${array[i].wallet}" target="_blank">${array[i].wallet}</a></p>
                        <p class="leaderboardGains">${array[i].flips}</p>
                    </div>
                </div>
            `
            }
        }
        dcfleaderboard.innerHTML = dcfleaderboardHTML
        
    })

}

// WIN STREAK
function dcfgetTopWinStreak() {


    let test3 = reset();

    fetch(`https://damp-ocean-83908.fly.dev/https://api.degencoinflip.com/v2/dashboard/top-gains?startTime=${test3}&limit=10000&showAll=true`)
    .then(res => res.json())
    .then(data => {
        dcfleaderboardHTML = ``
        array = []

        for (let items of data.payload.items) {
            array.push({winStreak: items.winStreak, wallet: items.walletId, name: items.nickname})
        }
        array.sort((a, b) => b.winStreak - a.winStreak)

        let count = data.payload.items.length;
        for (let i = 0; i < 10 && i < count; i++) {
            if (array[i].name) {
                dcfleaderboardHTML += `
                <div class="leaderboardItem">
                    <p class="leaderboardPosition">${i+1}.</p>
                    <div class="leaderboardItems">
                        <p class="leaderboardWallet"><a href="https://solscan.io/account/${array[i].wallet}" target="_blank">${array[i].name}</a></p>
                        <p class="leaderboardGains">${array[i].winStreak}</p>
                    </div>
                </div>
            `
            } else {
                dcfleaderboardHTML += `
                <div class="leaderboardItem">
                    <p class="leaderboardPosition">${i+1}.</p>
                    <div class="leaderboardItems">
                        <p class="leaderboardWallet"><a href="https://solscan.io/account/${array[i].wallet}" target="_blank">${array[i].wallet}</a></p>
                        <p class="leaderboardGains">${array[i].winStreak}</p>
                    </div>
                </div>
            `
            }
        }
        dcfleaderboard.innerHTML = dcfleaderboardHTML
    })

}

// DEFAULT
dcfgetTopGains()
dozergetTopGains()

// CLEAR CLASSES
function dcfclearClasses() {
    document.getElementById("dcfgettopGains").classList.remove("active")
    document.getElementById("dcfgettopVolume").classList.remove("active")
    document.getElementById("dcfgetTopFlips").classList.remove("active")
    document.getElementById("dcfgetTopWinStreak").classList.remove("active")
}
function dozerclearClasses(){
    document.getElementById("dozertopGains").classList.remove("active")
    document.getElementById("dozergettopVolume").classList.remove("active")
    document.getElementById("dozerCoins").classList.remove("active")
}

// CLICK
document.addEventListener("click", function(e) {
    if (e.target.id === "dcfgettopGains") {
        dcfgetTopGains()
        dcfclearClasses()
        document.getElementById("dcfgettopGains").classList.add("active")
    }
    if (e.target.id === "dcfgettopVolume") {
        dcfgetTopVolume()
        dcfclearClasses()
        document.getElementById("dcfgettopVolume").classList.add("active")
    }
    if (e.target.id === "dcfgetTopFlips") {
        dcfgetTopFlips()
        dcfclearClasses()
        document.getElementById("dcfgetTopFlips").classList.add("active")
    }
    if (e.target.id === "dcfgetTopWinStreak") {
        dcfgetTopWinStreak()
        dcfclearClasses()
        document.getElementById("dcfgetTopWinStreak").classList.add("active")
    }
})

document.addEventListener("click", function(e) {
    if (e.target.id === "dozertopGains") {
        dozergetTopGains()
        dozerclearClasses()
        document.getElementById("dozertopGains").classList.add("active")
    }
    if (e.target.id === "dozergettopVolume") {
        dozergetTopVolume()
        dozerclearClasses()
        document.getElementById("dozergettopVolume").classList.add("active")
    }
    if (e.target.id === "dozerCoins") {
        dozerCoins()
        dozerclearClasses()
        document.getElementById("dozerCoins").classList.add("active")
    }
})






//dozer dash

// dozer eligibility
let dozerEligibleInput = document.getElementById("dozerEligible")
let dozerEligibleBtn = document.getElementById("dozerEligibleBtn")
let dozerEligibleConfirmation = document.getElementById("dozerEligibleConfirmation")

let date = new Date();
let start = date.getDate() - (date.getDay() + 1);
let startString = new Date(date.setDate(start)).toUTCString();
let satString = new Date(startString).toISOString();
//let startDate = satString.substring(0,10);

let now = new Date("May 01 2023").getDay();
let dateholder = new Date();
let start1 = new Date(dateholder.setDate(now)).toISOString()
let startDate = start1.substring(0,10)


let date2 = new Date();
let end = date2.getDate() - (date2.getDay() - 6 );
let endString = new Date(date.setDate(end)).toUTCString();
let endString2 = new Date(endString).toISOString();
let endDate = endString2.substring(0,10);

let apiLink = "https://damp-ocean-83908.fly.dev/https://api.degencoindozer.com/v1/rankings?startTime="+startDate+"&dao=goldennomads&endTime="+endDate;

/*dozerEligibleBtn.addEventListener("click", function() {
    let wallet = dozerEligibleInput.value
    if (dozerEligibleInput.value.length >= 32 && dozerEligibleInput.value.length <= 44) {
        fetch(apiLink)
        .then(res => res.json())
        .then(data => {
            array = [];
            for (let payload of data.payload) {
                array.push(payload.owner);
            }
            if(array.includes(wallet)){
                dozerEligibleConfirmation.innerHTML = `
                <p style="color: green">${wallet} is eligible</p>
                `
            } else {
                dozerEligibleConfirmation.innerHTML = `
                <p style="color: red">${wallet} is not eligible</p>
                `
            }
          
        })
        dozerEligibleInput.value = ""
    } else {
        dozerEligibleConfirmation.innerHTML = `
        <p style="color: red">${wallet} is not eligible</p>
        `
        dozerEligibleInput.value = ""
    }
})*/


//countdown
let date1 = new Date()
let testlang = date1.getDay();

let first = 0
if(testlang == 0){
	first = date1.getDate() - (date1.getDay() -5)
}
else{
	first = date1.getDate() - (date1.getDay() -5)
}
let thursday = new Date(date1.setDate(first))
let th = new Date(thursday).toISOString()
let test2 = th.substring(0,10)

//var countDownDate = thursday.getTime();
var countDownDate = new Date(test2).getTime();


// Update the count down every 1 second
var x = setInterval(function() {
    

    var countDownDate = new Date(test2).getTime();
  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  

    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString();
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString();
  var seconds = Math.floor((distance % (1000 * 60)) / 1000).toString();
    
  // Output the result in an element with id="demo"
  document.getElementById("countdown").innerHTML = "<br><br><a>"+days + " Days " + hours + " Hours "
  + minutes + " Minutes " + seconds + " Seconds until dashboard reset";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x)

    
    
  }
}, 1000);




function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}
