import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";
const db = new PrismaClient();

(async () => {
  const pwdSalt = await bcrypt.genSalt();
  const pwdHash = await bcrypt.hash("1234567890", pwdSalt);
  const userEmail = "testuser@mail.com";
  const user = await db.user.upsert({
    update: {},
    where: { email: userEmail },
    create: {
      role: 3,
      email: userEmail,
      name: "John Doe",
      password: pwdHash,
    },
  });

  const test1 = await db.test.upsert({
    where: { id: "1" },
    update: {},
    create: {
      name: "test 1 (one)",
      createdByUserId: user.id,
      grades: [1, 2, 3],
      questions: {
        create: [
          {
            question: "whats yo first name",
            type: TEST_QUESTION_TYPE.TEXT,
            correctAnswerText: "joha",
            explanation: "yo first name is joha",
          },
          {
            question: "whats yo last name",
            type: TEST_QUESTION_TYPE.TEXT,
            correctAnswerText: "jo",
            explanation: "yo last name is jo",
          },
        ],
      },
    },
  });

  const test2 = await db.test.upsert({
    where: { id: "2" },
    update: {},
    create: {
      name: "test 2 (two)",
      createdByUserId: user.id,
      grades: [1, 2, 3],
      questions: {
        create: [
          {
            question: "what does 2 equal",
            type: TEST_QUESTION_TYPE.RADIO,
            correctAnswerText: "joha",
            explanation: "2 = 2",
            options: {
              create: [
                {
                  content: "2",
                  isCorrect: true,
                },
                {
                  content: "2 * 2",
                  isCorrect: false,
                },
                {
                  content: "2^2 (two to the pwwer off two)",
                  isCorrect: false,
                },
              ],
            },
          },
          {
            question:
              "В каком году было написано произведение Тургенева «Отцы и дети»?",
            type: TEST_QUESTION_TYPE.RADIO,
            options: {
              create: [
                {
                  content: "1859",
                  isCorrect: true,
                },
                {
                  content: "1861",
                  isCorrect: true,
                },
                {
                  content: "1869",
                  isCorrect: true,
                },
                {
                  content: "4120",
                  isCorrect: true,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const test3 = await db.test.upsert({
    where: { id: "3" },
    update: {},
    create: {
      name: "test 3 (three)",
      createdByUserId: user.id,
      grades: [1, 2, 3],
      questions: {
        create: [
          {
            question:
              "В каких литературном жанре написано произведение «Отцы и дети»?",
            type: TEST_QUESTION_TYPE.CHECKBOX,
            options: {
              create: [
                {
                  content: "рассказ",
                  isCorrect: true,
                },
                {
                  content: "повест",
                  isCorrect: true,
                },
                {
                  content: "роман",
                  isCorrect: false,
                },
                {
                  content: "эпопеяя",
                  isCorrect: false,
                },
              ],
            },
          },
          {
            question:
              "Какой является ведущая проблема произведения «Отцы и дети»?",
            type: TEST_QUESTION_TYPE.TABLE,
            options: {
              create: [
                {
                  tableColumn:
                    "Проблема выбора человеком между долгом и личными интересами.",
                  tableColumnAnswer: "нет",
                },
                {
                  tableColumn: "Проблема взаимоотношения двух поколений;",
                  tableColumnAnswer: "да",
                },
              ],
            },
          },
          {
            question:
              "Кто из героев произведения является ярким представителем нигилизма?",
            type: TEST_QUESTION_TYPE.CHECKBOX,
            options: {
              create: [
                {
                  content: "базаров",
                  isCorrect: true,
                },
                {
                  content: "акадий",
                  isCorrect: true,
                },
                {
                  content: "павел кирсанов",
                  isCorrect: false,
                },
              ],
            },
            explanation: `«Отцы и дети» – роман великого русского писателя Ивана Сергеевича Тургенева. Произведение довольно-таки сложное для восприятия его учащимися 10 класса. Поэтому, после прочтения «Отцы и дети» тест с ответами поможет учащимся проверить свои знания. В литературе это произведение занимает особое положение, Тургенев в центре романа представил нам разночинца Базарова, попавшего в чуждую ему обстановку «дворянского гнезда». И вот конфликтом этого произведения можно считать каждое столкновение главного героя с миром «отцов», и в свою очередь составляет своеобразное испытание на твёрдость его убеждений. Выполнив письменную работу, ответив на все её вопросы, учитель сможет получить истинную картину уровня знаний как того или иного класса, так и каждого отдельного ученика; сможет, проанализировав полученные результаты, разработать методы своей дальнейшей работы с целью совершенствования учебного процесса и использования инновационных приёмов, так необходимых для того, чтобы развивать у учащихся стремление к получению новых знаний и любви к литературе – сокровищнице человеческой мудрости.`,
          },
        ],
      },
    },
  });
  console.log(test1);
})();
