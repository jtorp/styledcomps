import styled from 'styled-components';
import FlexDiv from './FlexDiv';
import Button from './Button';
import Line from './Line';
import moment from 'moment'
import React, { useState, useRef } from 'react';


const StyledTextarea = styled.textarea`
    width:55%;
    height:75vh;
    background-color: ${props => props.background ||'transparent'}; 
    color: ${props => props.color || props.theme.colors.black};    
    font-size: 1rem;
    letter-spacing: length;
    padding-top:0.125rem;
    padding-left:0.125rem;
    resize:none;
    border:none;
    overflow: hidden;
    font-family: 'Tomorrow';
    
    &:focus{
        outline: 0;
    }
     
  @media ${props => props.theme.media.mobile}{
      font-size:1.125rem;
      letter-spacing: 0;
      width:98%;
  }
    
    @media ${props => props.theme.media.tablet}{
     font-size:1rem;
     width:65%;
     z-index:122
 }
    
  `;


const Textarea = ({ color, ...props }) => {

    let currentDateTime=moment().format("ddd, Do of MMM YYYY, h:mm a"); 
    const [lines, setNewLine] = useState([' ¶ ']);
    const ref = useRef();

    const onPressEnter = (e) => {
        if (e.charCode ===  13) {
            setNewLine([...lines, ' ¶ '])
        }
    }

    const downloadTxtFile = (typedArray) => {
        typedArray = ref.current.value;
        console.log(typedArray)
            const element = document.createElement("a");
            const file = new Blob([currentDateTime," From TYPE IT.", "\r\n", [typedArray]], {
              type: "text/plain"
            });
            element.href = URL.createObjectURL(file);
            element.download = "TypeIt.txt";
            document.body.appendChild(element);
            element.click();
          };

 
    

    return (
        <>
       
        <FlexDiv>
            <FlexDiv direction="column" margin="0 5px 0 10px">
            {lines.map(line=> <Line color = {color}>{line}</Line>)}
            </FlexDiv>

            <StyledTextarea 
            placeholder=" Write whatever is on your mind..."
            ref={ref}
            onKeyPress={onPressEnter}
            color={color}
            {...props}></StyledTextarea>
            
            </FlexDiv>
            <FlexDiv
                 margin={"0, 0rem, 0.5rem 3rem"}>
            <Button 
                    outlined
                    onClick={downloadTxtFile}> 

SAVE                </Button>
                <Button 
                    filled
                    onClick={() => {
                        setNewLine([' ¶ ']);
                        ref.current.value = ""
                    }
                    }> Clear
                      </Button>
                </FlexDiv>
            </>
      
    );
  
}

export default Textarea;