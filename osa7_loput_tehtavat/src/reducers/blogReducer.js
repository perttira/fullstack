import blogService from '../services/blogs'
import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
//import store from '../store'
import userReducer from '../services/blogs'


const blogReducer = (state = [], action) => {
  //console.log('blogReducer action.type', action.type)
  //console.log('blogReducer action.data', action.data)

  switch (action.type) {
  case 'GET_BLOGS':
    return action.data
  case 'ADD_BLOG':
    return [...state,action.data]
  case 'LIKE_BLOG':
    return state
  default:
    return state
  }
}

export const acGetBlogs = () => {
  return async dispatch => {
    let sortedBlogs = await blogService.getAll()
    sortedBlogs = sortedBlogs.sort(function (a, b) { return b.likes - a.likes })
    dispatch({
      type: 'GET_BLOGS',
      data: sortedBlogs
    })
  }
}


export const acAddBlog = (e) => {
  //console.log('acAddBlog e', e)
  //console.log('acAddBlog e.target.title.value', e.target.title.value)
  //console.log('acAddBlog store.getState()', store.getState())
  //console.log('acAddBlog e.target.user', e.target.user)

  const noteObject = {
    title: e.target.title.value,
    author: e.target.author.value,
    url: e.target.url.value,
    text: e.target.text.value,
    user: {
      username: e.target.user.username,
      name: e.target.user.name,
      id: e.target.user.id
    },

    likes: 0
  }

  //console.log('acAddBlog noteObject', noteObject)


  return async dispatch => {
    let response = await blogService.create(noteObject)
    //console.log('acAddBlog response', response)
    dispatch({
      type: 'ADD_BLOG',
      data: response
    })
  }
}
/*
const mapStateToProps = (state) => {
  console.log('mapStateToProps state', state)
  return {
    user: state.user
  }
}
*/

export default (blogReducer)