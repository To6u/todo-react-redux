import React from 'react'
import './about.sass'

const About: React.FC = () => {
  return (
    <div className="container">
      <h2 className="my-5">Немного информации о тудушке</h2>
      <p>Тудушка, это очередной велосипед списка задач</p>
      <h4>Было изучено и практические навыки преобретены:</h4>
      <ul>
        <li>Использование Redux в связке в React.js</li>
        <li>Создание одностраничного приложения на React.js</li>
        <li>Использование библиотеки axios для отправки запросов на сервер</li>
        <li>Использование Firebase как хостинг</li>
        <li>Работа с анимациями в React.js с помощью библиотеки react-transition-group</li>
        <li>Использование библиотеки React DnD для возможности изменения задач местами с помощью перетаскивания</li>
      </ul>
      <h4>Умеет</h4>
      <ul>
        <li>Добавить задачу</li>
        <li>Удалить задачу</li>
        <li>Редактировать задачу</li>
        <li>Сортировка с помощью перетаскивания</li>
        <li>Завершить задачу</li>
      </ul>
    </div>
  )
}

export default About
