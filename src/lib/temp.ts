import { VkReview } from "./utils";

export const REVIEWS_HREF = `https://vk.com/topic-17736985_35735126`;

export const reviews: VkReview[] = [
  {
    id: 1,
    text: "Пришла к Андрею с исправлением татуировки .Мастер топ ,переделал работу за другого мастера и дополнил эскиз 😻Работой довольна 🔥 рекомендую мастера .",
    date: dateToUnix("2026-10-14"),
    authorName: "Маша Липатова",
  },
  {
    id: 2,
    text: "Андрей топ, хожу только к нему на забивку:)",
    date: dateToUnix("2026-10-13"),
    authorName: "Hello Din'ya",
    authorPhoto: "https://sun9-6.vkuserphoto.ru/s/v1/ig2/LW_72CpF8h1-zxbPhcJjeRN-SznuG2jxTL8rXar30fU_2Ffdn6FwDSyIWC4DMWtmZ9y4dfdunNJjTeFN0wrOGF5q.jpg?quality=95&as=32x31,48x47,72x70,108x105,160x155,240x233,360x349,480x466,540x524,640x621,720x699,1080x1048,1125x1092&from=bu&cs=1125x0"
  },
  {
    id: 3,
    text: "Тааакс, с чего бы начать… Это моя первая и единственная любимая🖤тату-студия, в которую я хожу с 2019го. Практически все мои тату (около 20ти штук), я делал именно тут. Андрей - мой первый тату мастер и настоящий товарищ, к которому я прихожу по сей день набить что нибудь новенькое, или просто потусить вместе😎 Ещё, около двух лет назад туда пришел новенький, очень активный тату-мастер, который подходит к своим работам с большим энтузиазмом - Артур✌Последняя фоточка как раз его работа (к сожалению больше фоточек не влезло) Его проекты мне тоже нравятся, и к нему я залетаю в перерывах, между проектами у Андрея🔥",
    date: dateToUnix("2026-10-12"),
    authorName: "Миша Котков",
    authorPhoto: "https://sun9-4.vkuserphoto.ru/s/v1/ig2/7j60nsnXeHh6gjSuyPGNsAsxPeeyMclwMahS3O3JvnsxQR5Hy5syyFUN0j7oL8iENHalb9Z3pY4rS0N2SfZicy6z.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1920x2560&from=bu&cs=1920x0"
  },
  // {
  //   id: 4,
  //   text: "Привет всем, решилась на первую тату, делал Андрей. Сделал все очень качественно, подсказал как правильно расположить рисунок. Получилось очень круто и за приемлемую цену. Буду всем советовать Андрея! Спасибо вам большое!",
  //   date: 1712188800,
  //   authorName: "Ольга Ворошилина",
  //   authorPhoto: "https://sun9-80.vkuserphoto.ru/s/v1/ig1/m7G4-wZUT7zymOj82Jphf3QxTnVFJBaNIXTT11iFR9-LfX0jn_A-3Fn9kj6cSsTEZ7voDCE43EMVAQ.jpg?quality=96&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x270,540x304,640x360,720x405,1080x607,1280x720,1440x810,2560x1440&from=bu&cs=2560x0"
  // },
  // {
  //   id: 5,
  //   text: "Тату Пермь. CULT ♢ Cтудия татуировки и пирсинга, Андрей отличный мастер своего дела, сделал уже третью татуировку, и не в чем не желею, культ рулит!!!",
  //   date: 1680480000,
  //   authorName: "Андрей Аликин",
  //   authorPhoto: "https://sun9-80.vkuserphoto.ru/s/v1/ig1/m7G4-wZUT7zymOj82Jphf3QxTnVFJBaNIXTT11iFR9-LfX0jn_A-3Fn9kj6cSsTEZ7voDCE43EMVAQ.jpg?quality=96&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x270,540x304,640x360,720x405,1080x607,1280x720,1440x810,2560x1440&from=bu&cs=2560x0"
  // },
  // {
  //   id: 6,
  //   text: "Тату салон атмосферный. Андрей грамотно и понятно отвечал на всё мои вопросы. Пару раз корректировал эскиз прям на месте. Тем что я сделал свою первую тату в этом салоне, несколько не жалею. Буду рекомендовать всём друзьям и знакомым",
  //   date: 1680480000,
  //   authorName: "Василий Лядов",
  //   authorPhoto: "https://sun9-80.vkuserphoto.ru/s/v1/ig1/m7G4-wZUT7zymOj82Jphf3QxTnVFJBaNIXTT11iFR9-LfX0jn_A-3Fn9kj6cSsTEZ7voDCE43EMVAQ.jpg?quality=96&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x270,540x304,640x360,720x405,1080x607,1280x720,1440x810,2560x1440&from=bu&cs=2560x0"
  // },
  // {
  //   id: 7,
  //   text: "Сделали с женой парные тату, всё понравилось, мастера отличные, атмосфера класс, уютно и чистенько, обязательно вернёмся за следующими ))",
  //   date: 1625184000,
  //   authorName: "Вася Вяткин",
  //   authorPhoto: "https://sun9-80.vkuserphoto.ru/s/v1/ig1/m7G4-wZUT7zymOj82Jphf3QxTnVFJBaNIXTT11iFR9-LfX0jn_A-3Fn9kj6cSsTEZ7voDCE43EMVAQ.jpg?quality=96&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x270,540x304,640x360,720x405,1080x607,1280x720,1440x810,2560x1440&from=bu&cs=2560x0"
  // },
  // {
  //   id: 8,
  //   text: "Свое второе тату ( перекрытие) решилась сделать в тату Студио CULT. внимательное деликатное человеческое отношение и адекватные цены. и даже отношение к татуировке как к искусству, а не как к работе. я влюбилась в сиё творение... у мастер а золотые руки, больно не было, работой полностью довольна... теперь ещё хочууууууу",
  //   date: 1603065600,
  //   authorName: "Татьяна Новикова",
  //   authorPhoto: "https://sun9-80.vkuserphoto.ru/s/v1/ig1/m7G4-wZUT7zymOj82Jphf3QxTnVFJBaNIXTT11iFR9-LfX0jn_A-3Fn9kj6cSsTEZ7voDCE43EMVAQ.jpg?quality=96&as=32x18,48x27,72x40,108x61,160x90,240x135,360x202,480x270,540x304,640x360,720x405,1080x607,1280x720,1440x810,2560x1440&from=bu&cs=2560x0"
  // },
];

export function dateToUnix(dateString: string): number {
  const date = new Date(dateString); // например, '2021-07-02'
  if (isNaN(date.getTime())) {
    throw new Error(`Некорректная дата: ${dateString}`);
  }
  return Math.floor(date.getTime() / 1000);
}
