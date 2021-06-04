import styled, { css } from 'styled-components'

interface SearchHeaderProps {
  fixed?: boolean
}

export const SearchHeaderContainer = styled.div<SearchHeaderProps>`
  height: 4rem;
  width: 100%;
  padding: 0 2rem;
  display: flex;
  align-items: center;

  ${props => props.fixed && css`
    position: fixed;
    top: 0;
    left : 0;
    background-color: rgba(0, 0 ,0 ,.5);
    backdrop-filter: blur(16px);
  `}

  > form{
    display: flex;
    align-items: center;
    
    input{
      height: 2rem;
      border-radius: .25rem 0 0 .25rem;
      border: none;
      width: 30vw;
      min-width: 10rem;
      background-color: rgba(255,255,255,.1);
      outline: none;
      color: #fff;
      padding: 0 .5rem;
      margin-left: 1rem;
    }

    button{
      height: 2rem;
      width: 3rem;
      border-radius: 0 .25rem .25rem 0;
      border: none;
      background-color: rgba(255,255,255,.15);
      color: #fff;
      outline: none;
      cursor: pointer;
      transition: background .2s;

      :active{
        background-color:rgba(255,255,255,.1);
      }
    }
  }
`
