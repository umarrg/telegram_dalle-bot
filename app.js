require('./connections/connection.mongo')();
const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require("openai");
const controller = require('./dao/dao');
const express = require('express');
const cors = require("cors");
const sdk = require('api')('@neural-love/v1.0#1d6anw43ld3oas2i');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "1gb" }));
app.use(cors());


const bot = new TelegramBot("5942717196:AAFHN7O1sbAcCf2RfKMMqUIb5zl6_uUO2uE", { polling: true });
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
sdk.auth('v1.c9c418f1a1b45f8c8f154fd34a1b99c2be367a4c987d070d69d9f4cf26b9ed51');
const PORT = process.env.PORT || 9000

app.get('/', (req, res) => {
    res.status(200).json({ status: 'success', payload: "breed AI API" });
});

async function genImg(text, style) {

    let id = await createOrder(text,style);
    let date = new Date();

    function x(resolve) {

        return new Promise((resolve) => {
            setTimeout(function () {
                let res = gen(id);
                resolve(res)
            }, 16000);;
        });

    }

    let res = await x();
    return res










}

async function createOrder(text,style) {

    const id = await sdk.aiArtGenerate({
        amount: 2,
        isPublic: true,
        isPriority: false,
        isHd: false,
        steps: 25,
        cfgScale: 7.5,
        style: style,
        layout: 'vertical',
        prompt: text
    })
        .then(({ data }) => { console.log(data); return data.orderId })
        .catch(err => console.error(err));


    return id;
}


async function gen(id) {


    const url = await sdk.aiArtGetOrder({ id: id })
        .then(({ data }) => { console.log(data); return data.thumbnails[0].url })
        .catch(err => console.error(err));



    return url;



}



bot.onText(/\/taijourney (.+)/, async (msg, match) => {
    const ctx = msg.chat;
    const username = msg.from.username;
    const resp = match[1];
    bot.sendPhoto(msg.chat.id, "https://png.pngitem.com/pimgs/s/117-1171969_monochrome-hd-png-download.png", {
        caption: "images are currently being generated...",
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id
    }).then(function (result) {
        setTimeout(() => {
            bot.deleteMessage(msg.chat.id, result.message_id);
          
        }, 13000);
    });

    // console.log(msg.from.username)
    const url = await genImg(resp, "midjourney");
    if (typeof url === 'string' && url.length === 0 || url === undefined || url === null) {
        console.log(' is empty');
    } else {
        const res = await controller.addNew({ img: url, prompt: resp, model: "taijourney", type:"midjourney"  });
        let uid = res._id;
        let r = ` New request completed for @${username}` + "\r\n" + "\r\n" + `<b>Request ID:</b> ${uid}  
        `  + "\r\n" + "\r\n" + `<b>Model:</b> breed` + "\r\n" + `<b>Prompt:</b> ${resp}` + "\r\n" + "\r\n"
        await bot.sendPhoto(ctx.id, url, {
            caption: r,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Regenerate",
                            callback_data: uid,
                            message: () => bot.getMe().then(function (info) {
                                return info.username

                            })

                        },

                    ],
                ]
            },
            disable_web_page_preview: false,
        })
    }



});

bot.onText(/\/taipunk (.+)/, async (msg, match) => {
    const ctx = msg.chat;
    const username = msg.from.username;
    const resp = match[1];
    // console.log(msg.from.username)
    let req = resp;
    bot.sendPhoto(msg.chat.id, "https://png.pngitem.com/pimgs/s/117-1171969_monochrome-hd-png-download.png", {
        caption: "images are currently being generated...",
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id
    }).then(function (result) {
        setTimeout(() => {
            bot.deleteMessage(msg.chat.id, result.message_id);

        }, 13000);
    });
    const url = await genImg(req, "cyberpunk");
    if (typeof url === 'string' && url.length === 0 || url === undefined || url === null) {
        console.log(' is empty');
    } else {
        const res = await controller.addNew({ img: url, prompt: resp, model: "taipunk", type:"cyberpunk" });
        let uid = res._id;
        let r = ` New request completed for @${username}` + "\r\n" + "\r\n" + `<b>Request ID:</b> ${uid}  
        `  + "\r\n" + "\r\n" + `<b>Model:</b> cyberpunk` + "\r\n" + `<b>Prompt:</b> ${resp}` + "\r\n" + "\r\n"
        await bot.sendPhoto(ctx.id, url, {
            caption: r,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Regenerate",
                            callback_data: uid,
                            message: () => bot.getMe().then(function (info) {
                                return info.username

                            })

                        },

                    ],
                ]
            },
            disable_web_page_preview: false,
        })
    }



});
bot.onText(/\/taicomic (.+)/, async (msg, match) => {
    const ctx = msg.chat;
    const username = msg.from.username;
    const resp = match[1];
    // console.log(msg.from.username)
    let req = resp;
    bot.sendPhoto(msg.chat.id, "https://png.pngitem.com/pimgs/s/117-1171969_monochrome-hd-png-download.png", {
        caption: "images are currently being generated...",
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id
    }).then(function (result) {
        setTimeout(() => {
            bot.deleteMessage(msg.chat.id, result.message_id);

        }, 13000);
    });
   
    const url = await genImg(req,"space");
    if (typeof url === 'string' && url.length === 0 || url === undefined || url === null) {
        console.log(' is empty');
    } else {
    const url = await genImg(req,"space");
        const res = await controller.addNew({ img: url, prompt: resp, model: "cogent", type:"space" });
        let uid = res._id;
        let r = ` New request completed for @${username}` + "\r\n" + "\r\n" + `<b>Request ID:</b> ${uid}  
        `  + "\r\n" + "\r\n" + `<b>Model:</b> cogent` + "\r\n" + `<b>Prompt:</b> ${resp}` + "\r\n" + "\r\n"
        await bot.sendPhoto(ctx.id, url, {
            caption: r,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Regenerate",
                            callback_data: uid,
                            message: () => bot.getMe().then(function (info) {
                                return info.username

                            })

                        },

                    ],
                ]
            },
            disable_web_page_preview: false,
        })
    }



});
bot.onText(/\/taiscape (.+)/, async (msg, match) => {
    const ctx = msg.chat;
    const username = msg.from.username;
    const resp = match[1];
    bot.sendPhoto(msg.chat.id, "https://png.pngitem.com/pimgs/s/117-1171969_monochrome-hd-png-download.png", {
        caption: "images are currently being generated...",
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id
    }).then(function (result) {
        setTimeout(() => {
            bot.deleteMessage(msg.chat.id, result.message_id);

        }, 13000);
    });
    // console.log(msg.from.username)
    let req = resp;
    const url = await genImg(req,"nature ");
    if (typeof url === 'string' && url.length === 0 || url === undefined || url === null) {
        console.log(' is empty');
    } else {
        const res = await controller.addNew({ img: url, prompt: resp, model: "taiscape", type: "nature" });
        let uid = res._id;
        let r = ` New request completed for @${username}` + "\r\n" + "\r\n" + `<b>Request ID:</b> ${uid}  
        `  + "\r\n" + "\r\n" + `<b>Model:</b> artistic` + "\r\n" + `<b>Prompt:</b> ${resp}` + "\r\n" + "\r\n"
        await bot.sendPhoto(ctx.id, url, {
            caption: r,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Regenerate",
                            callback_data: uid,
                            message: () => bot.getMe().then(function (info) {
                                return info.username

                            })

                        },

                    ],
                ]
            },
            disable_web_page_preview: false,
        })
    }



});





bot.on("callback_query", async function onCallbackQuery(btn) {
    const msg = btn.message;
    const username = msg.chat.username;
    const ctx = msg.chat;
    const data = btn.data;
    if (data) {
        const res = await controller.getOne(data);

        bot.sendMessage(ctx.id, `Processing a regenerate request for @${btn.from.username}.` + "\r\n" + "\r\n" + `<b>Request ID:</b> ${res._id}` + "\r\n" + "\r\n" + `<b>Model:</b> ${res.model}` + "\r\n" + `<b>Prompt:</b> ${res.prompt}` + "\r\n" + "\r\n", {
            parse_mode: "HTML",
        });
        const img = await genImg(res.prompt, res.type);
        if (typeof img === 'string' && img.length === 0 || img === undefined || img === null) {
            onsole.log(' is empty');

        } else {

            let rs = ` Regenerate request completed for @${btn.from.username}` + "\r\n" + "\r\n" + `<b>Request ID:</b> ${res._id}  
        `  + "\r\n" + "\r\n" + `<b>Model:</b> ${res.model}` + "\r\n" + `<b>Prompt:</b> ${res.prompt}` + "\r\n" + "\r\n"
            await bot.sendPhoto(ctx.id, img, {
                caption: rs,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "Regenerate",
                                callback_data: res._id
                            },

                        ],
                    ]
                },
                disable_web_page_preview: false,
            });
        }


    }


}
)
app.listen(PORT, () => {
    console.log('Bot listening on port ' + PORT)
});
