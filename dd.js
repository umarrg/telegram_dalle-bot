import TelegramBot from 'node-telegram-bot-api';
import { Dalle } from "dalle-node";
import { Configuration, OpenAIApi } from "openai";
const bot = new TelegramBot("6071275080:AAFHDfG7xlUW3ef-u1zfLkR3byP996iiTzQ", { polling: true });
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration)
const dalle = new Dalle("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");

async function generateImg() {
    const generations = await openai.createImage({
        prompt: "anime character",

    });
    console.log(generations);
    return generations.data.data[0].url

}
bot.onText(/^\/test$/, function (msg) {
    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: [['Level 1']]
        }
    };

    bot.sendMessage(msg.chat.id, "I'm a test robot", opts);
});
bot.onText(/^\/anime$/, async (msg) => {

    const ctx = msg.chat;
    const url = await generateImg();

    let r = ` New request completed for @${ctx.username}` + "\r\n" + `<b>Model:</b> Chimp Voyage` + "\r\n" + `<b>Prompt:</b> anime characters` + "\r\n" + "<a href='dsmdssmmssmsms'>twitter</a>"
    await bot.sendPhoto(ctx.id, url, {
        caption: r,
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Regenerate",
                        url: 'https://core.telegram.org/bots/api#inlinekeyboardbutton' // You MUST use exactly one of the optional fields.
                    },

                ],
            ]
        },
        disable_web_page_preview: false,


    });


    // const opts = {

    //   };
    //   bot.sendMessage(msg.from.id, 'test text', opts);



});

