require('./connections/connection.mongo')();
const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require("openai");
const controller = require('./dao/dao');
const express = require('express');
const cors = require("cors");




const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "1gb" }));
app.use(cors());


const bot = new TelegramBot("5942717196:AAFHN7O1sbAcCf2RfKMMqUIb5zl6_uUO2uE", { polling: true });
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const PORT = process.env.PORT || 9000

app.get('/', (req, res) => {
    res.status(200).json({ status: 'success', payload: "breed AI API" });
});

async function generateImg(text) {

    try {
        const response = await openai.createImage({
            prompt: text,

        })

        let url = response.data.data[0].url;

        return url;
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }


}



bot.onText(/\/breed (.+)/, async (msg, match) => {
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

        }, 5000);
    });

    // console.log(msg.from.username)
    const url = await generateImg(resp);
    if (typeof url === 'string' && url.length === 0 || url === undefined || url === null) {
        console.log(' is empty');
    } else {

        const res = await controller.addNew({ img: url, prompt: resp, model: "breed" });
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

bot.onText(/\/snazzy (.+)/, async (msg, match) => {
    const ctx = msg.chat;
    const username = msg.from.username;
    const resp = match[1];
    // console.log(msg.from.username)
    let req = "snazzy" + resp;
    bot.sendPhoto(msg.chat.id, "https://png.pngitem.com/pimgs/s/117-1171969_monochrome-hd-png-download.png", {
        caption: "images are currently being generated...",
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id
    }).then(function (result) {
        setTimeout(() => {
            bot.deleteMessage(msg.chat.id, result.message_id);

        }, 5000);
    });
    const url = await generateImg(req);
    if (typeof url === 'string' && url.length === 0 || url === undefined || url === null) {
        console.log(' is empty');
    } else {
        const res = await controller.addNew({ img: url, prompt: resp, model: "snazzy" });
        let uid = res._id;
        let r = ` New request completed for @${username}` + "\r\n" + "\r\n" + `<b>Request ID:</b> ${uid}  
        `  + "\r\n" + "\r\n" + `<b>Model:</b> snazzy` + "\r\n" + `<b>Prompt:</b> ${resp}` + "\r\n" + "\r\n"
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
bot.onText(/\/cogent (.+)/, async (msg, match) => {
    const ctx = msg.chat;
    const username = msg.from.username;
    const resp = match[1];
    // console.log(msg.from.username)
    let req = "cogent" + resp;
    bot.sendPhoto(msg.chat.id, "https://png.pngitem.com/pimgs/s/117-1171969_monochrome-hd-png-download.png", {
        caption: "images are currently being generated...",
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id
    }).then(function (result) {
        setTimeout(() => {
            bot.deleteMessage(msg.chat.id, result.message_id);

        }, 5000);
    });
    bot.sendPhoto(msg.chat.id, "https://png.pngitem.com/pimgs/s/117-1171969_monochrome-hd-png-download.png", {
        caption: "images are currently being generated...",
        parse_mode: "HTML",
        reply_to_message_id: msg.message_id
    })
    const url = await generateImg(req);
    if (typeof url === 'string' && url.length === 0 || url === undefined || url === null) {
        console.log(' is empty');
    } else {
        const res = await controller.addNew({ img: url, prompt: resp, model: "cogent" });
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
bot.onText(/\/artistic (.+)/, async (msg, match) => {
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

        }, 5000);
    });
    // console.log(msg.from.username)
    let req = "artistic" + resp;
    const url = await generateImg(req);
    if (typeof url === 'string' && url.length === 0 || url === undefined || url === null) {
        console.log(' is empty');
    } else {
        const res = await controller.addNew({ img: url, prompt: resp, model: "artistic" });
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
        const img = await generateImg(res.prompt);
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
