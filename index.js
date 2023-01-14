let dcfRevenue
let dcfPayout
let dcfCat
let dcfRevenueHTML = document.getElementById("dcfRevenue")
let dcfPayoutHTML = document.getElementById("dcfPayout")
let dcfCatHTML = document.getElementById("dcfCat")

let dcdRevenue
let dcdPayout
let dcdCat
let dcdRevenueHTML = document.getElementById("dcdRevenue")
let dcdPayoutHTML = document.getElementById("dcdPayout")
let dcdCatHTML = document.getElementById("dcdCat")

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

function getDCF() {
    fetch("https://public-api.solscan.io/account/h2oMkkgUF55mxMFeuUgVYwvEnpV5kRbvHVuDWMKDYFC")
        .then(res => res.json())
        .then(data => {
            dcfRevenue = data.lamports /1000000000
            dcfPayout = (dcfRevenue * 0.587) / 20000
            dcfCat = dcfPayout * localStorage.getItem("catsOwned")

            dcfRevenueHTML.textContent = `${dcfRevenue.toFixed(2)} Sol`
            dcfPayoutHTML.textContent = `${dcfPayout.toFixed(2)} Sol`
            dcfCatHTML.textContent = `${dcfCat.toFixed(2)} Sol`
        })
}

/*
function getDCD() {
    fetch("https://public-api.solscan.io/account/3biJV4VbV6zJSV8mqUzx76YM8bgMeB5PtuFv6PQHzP1d")
        .then(res => res.json())
        .then(data => {
            fetch("https://public-api.solscan.io/account/Fii9oCjWSKty9yM8VJdd8D2o2zX5MTHkEop3rVyEFc4J")
                .then(res2 => res2.json())
                .then(data2 => {
                    dcdRevenue = (data.lamports / 1000000000) + (data2.lamports / 1000000000)
                    dcdPayout = (dcdRevenue * 0.587) / 20000
                    dcdCat = dcdPayout * localStorage.getItem("catsOwned")

                    dcdRevenueHTML.textContent = `${dcdRevenue.toFixed(2)} Sol`
                    dcdPayoutHTML.textContent = `${dcdPayout.toFixed(2)} Sol`
                    dcdCatHTML.textContent = `${dcdCat.toFixed(2)} Sol`
                })
        })
}
*/

function getDCD() {
    fetch("https://public-api.solscan.io/account/BXb2Bh17kzkZpKf3yiKspYSrstJxbcjXsyt6mtexDPqa")
        .then(res => res.json())
        .then(data => {
            dcdRevenue = (data.lamports / 1000000000)
            dcdPayout = (dcdRevenue * 0.587) / 20000
            dcdCat = dcdPayout * localStorage.getItem("catsOwned")

            dcdRevenueHTML.textContent = `${dcdRevenue.toFixed(2)} Sol`
            dcdPayoutHTML.textContent = `${dcdPayout.toFixed(2)} Sol`
            dcdCatHTML.textContent = `${dcdCat.toFixed(2)} Sol`
        })
}

function getTOTAL() {
    totalRevenue = dcdRevenue + dcfRevenue
    totalPayout = dcdPayout + dcfPayout
    totalCat = totalPayout * localStorage.getItem("catsOwned")

    totalRevenueHTML.textContent = `${totalRevenue.toFixed(2)} Sol`
    totalPayoutHTML.textContent = `${totalPayout.toFixed(2)} Sol`
    totalCatHTML.textContent = `${totalCat.toFixed(2)} Sol`
}

function getFLOOR() {
    fetch("https://www.dcfdash.com/api/floor", {
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

    fetch(`https://damp-ocean-83908.fly.dev/https://api.degencoinflip.com/v2/dashboard/top-gains?startTime=${test3}&limit=10000&showAll=true&referral=goldennomads`)
        .then(res => res.json())
        .then(data => {
            for (let item of data.payload.items) {
                totalVolume += item.total
                jackpot = ((totalVolume * 0.035) * 0.2428) * 0.05
            }
            fetch(`https://public-api.solscan.io/account/jpotSBs8opQ4xGDn2xbRQS4eChNG5w4kxEeS1Rx9tyg`)
                .then(res2 => res2.json())
                .then(data2 => {
                    jackpotTotal = jackpot + (data2.lamports / 1000000000)
                    let NEWJACKPOT = (data2.lamports / 1000000000)

                    document.querySelector(".jackpot").innerHTML = `
                        <h2>${NEWJACKPOT.toFixed(2)} Sol</h2>
                    `
                })
        })
}

catsOwned.value = localStorage.getItem("catsOwned")

catsOwnedDiv.addEventListener("change", function(e) {
    localStorage.setItem("catsOwned", e.target.value)
    getDCF()
    getDCD()
    getFLOOR()
    setTimeout(getTOTAL, 1500)
})

eligibleBtn.addEventListener("click", function() {
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
}) 

function render() {
    jackpot()
    getDCF()
    getDCD()
    setTimeout(getTOTAL, 1500)
    getFLOOR()
    setTimeout(render, 10000)
}

render()

let leaderboard = document.getElementById("leaderboard")

function compareNumbers(a, b) {
    return a - b;
  }
  
let leaderboardHTML = ``
let array = []

// GAIN
function getTopGains() {

    let date = new Date()
    console.log(date)
    let first = date.getDate() - (date.getDay() + 1)
    console.log(first)
    let saturday = new Date(date.setDate(first)).toUTCString()
    console.log(saturday)
    let test = new Date(saturday).toISOString()
    console.log(test)
    let test2 = test.substring(0,10)
    console.log(test2)
    let test3 = `${test2}T00:00:00.000Z`
    console.log(test3)

    fetch(`https://damp-ocean-83908.fly.dev/https://api.degencoinflip.com/v2/dashboard/top-gains?startTime=${test3}&limit=10000&showAll=true&referral=goldennomads`)
    .then(res => res.json())
    .then(data => {
        console.log(data.payload)
        leaderboardHTML = ``
        for (let i = 0; i < 10; i++) {
            if (data.payload.items[i].nickname) {
                leaderboardHTML += `
                <div class="leaderboardItem">
                    <p class="leaderboardPosition">${i+1}.</p>
                    <div class="leaderboardItems">
                        <p class="leaderboardWallet"><a href="https://solscan.io/account/${data.payload.items[i].walletId}" target="_blank">${data.payload.items[i].nickname}</a></p>
                        <p class="leaderboardGains">${data.payload.items[i].netGains.toFixed(2)}</p>
                    </div>
                </div>
            `
            } else {
                leaderboardHTML += `
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
        leaderboard.innerHTML = leaderboardHTML
    })

}

// VOLUME
function getTopVolume() {

    let date = new Date()
    let first = date.getDate() - (date.getDay() + 1);
    let saturday = new Date(date.setDate(first)).toUTCString()
    let test = new Date(saturday).toISOString()
    let test2 = test.substring(0,10)
    let test3 = `${test2}T00:00:00.000Z`

    fetch(`https://damp-ocean-83908.fly.dev/https://api.degencoinflip.com/v2/dashboard/top-gains?startTime=${test3}&limit=10000&showAll=true&referral=goldennomads`)
    .then(res => res.json())
    .then(data => {
        leaderboardHTML = ``
        array = []

        for (let items of data.payload.items) {
            array.push({volume: items.total, wallet: items.walletId, name: items.nickname})
        }
        array.sort((a, b) => b.volume - a.volume)
        console.log(array)

        for (let i = 0; i < 10; i++) {
            if (array[i].name) {
                leaderboardHTML += `
                <div class="leaderboardItem">
                    <p class="leaderboardPosition">${i+1}.</p>
                    <div class="leaderboardItems">
                        <p class="leaderboardWallet"><a href="https://solscan.io/account/${array[i].wallet}" target="_blank">${array[i].name}</a></p>
                        <p class="leaderboardGains">${array[i].volume.toFixed(2)}</p>
                    </div>
                </div>
            `
            } else {
                leaderboardHTML += `
                <div class="leaderboardItem">
                    <p class="leaderboardPosition">${i+1}.</p>
                    <div class="leaderboardItems">
                        <p class="leaderboardWallet"><a href="https://solscan.io/account/${array[i].wallet}" target="_blank">${array[i].wallet}</a></p>
                        <p class="leaderboardGains">${array[i].volume.toFixed(2)}</p>
                    </div>
                </div>
            `
            }
        }
        leaderboard.innerHTML = leaderboardHTML
    })

}

// FLIP
function getTopFlips() {

    let date = new Date()
    let first = date.getDate() - (date.getDay() + 1);
    let saturday = new Date(date.setDate(first)).toUTCString()
    let test = new Date(saturday).toISOString()
    let test2 = test.substring(0,10)
    let test3 = `${test2}T00:00:00.000Z`

    fetch(`https://damp-ocean-83908.fly.dev/https://api.degencoinflip.com/v2/dashboard/top-gains?startTime=${test3}&limit=10000&showAll=true&referral=goldennomads`)
    .then(res => res.json())
    .then(data => {
        leaderboardHTML = ``
        array = []

        for (let items of data.payload.items) {
            array.push({flips: items.totalFlips, wallet: items.walletId, name: items.nickname})
        }
        array.sort((a, b) => b.flips - a.flips)
        console.log(array)

        for (let i = 0; i < 10; i++) {
            if (array[i].name) {
                leaderboardHTML += `
                <div class="leaderboardItem">
                    <p class="leaderboardPosition">${i+1}.</p>
                    <div class="leaderboardItems">
                        <p class="leaderboardWallet"><a href="https://solscan.io/account/${array[i].wallet}" target="_blank">${array[i].name}</a></p>
                        <p class="leaderboardGains">${array[i].flips}</p>
                    </div>
                </div>
            `
            } else {
                leaderboardHTML += `
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
        leaderboard.innerHTML = leaderboardHTML
    })

}

// WIN STREAK
function getTopWinStreak() {

    let date = new Date()
    let first = date.getDate() - (date.getDay() + 1);
    let saturday = new Date(date.setDate(first)).toUTCString()
    let test = new Date(saturday).toISOString()
    let test2 = test.substring(0,10)
    let test3 = `${test2}T00:00:00.000Z`

    fetch(`https://damp-ocean-83908.fly.dev/https://api.degencoinflip.com/v2/dashboard/top-gains?startTime=${test3}&limit=10000&showAll=true&referral=goldennomads`)
    .then(res => res.json())
    .then(data => {
        leaderboardHTML = ``
        array = []

        for (let items of data.payload.items) {
            array.push({winStreak: items.winStreak, wallet: items.walletId, name: items.nickname})
        }
        array.sort((a, b) => b.winStreak - a.winStreak)
        console.log(array)

        for (let i = 0; i < 10; i++) {
            if (array[i].name) {
                leaderboardHTML += `
                <div class="leaderboardItem">
                    <p class="leaderboardPosition">${i+1}.</p>
                    <div class="leaderboardItems">
                        <p class="leaderboardWallet"><a href="https://solscan.io/account/${array[i].wallet}" target="_blank">${array[i].name}</a></p>
                        <p class="leaderboardGains">${array[i].winStreak}</p>
                    </div>
                </div>
            `
            } else {
                leaderboardHTML += `
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
        leaderboard.innerHTML = leaderboardHTML
    })

}

// DEFAULT
getTopGains()

// CLEAR CLASSES
function clearClasses() {
    document.getElementById("topGains").classList.remove("active")
    document.getElementById("topVolume").classList.remove("active")
    document.getElementById("topFlips").classList.remove("active")
    document.getElementById("topWinStreak").classList.remove("active")
}

// CLICK
document.addEventListener("click", function(e) {
    if (e.target.id === "topGains") {
        getTopGains()
        clearClasses()
        document.getElementById("topGains").classList.add("active")
    }
    if (e.target.id === "topVolume") {
        getTopVolume()
        clearClasses()
        document.getElementById("topVolume").classList.add("active")
    }
    if (e.target.id === "topFlips") {
        getTopFlips()
        clearClasses()
        document.getElementById("topFlips").classList.add("active")
    }
    if (e.target.id === "topWinStreak") {
        getTopWinStreak()
        clearClasses()
        document.getElementById("topWinStreak").classList.add("active")
    }
})
