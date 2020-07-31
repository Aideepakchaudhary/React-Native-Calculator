require("./../lib/swisscalc.lib.format");
require("./../lib/swisscalc.lib.operator");
require("./../lib/swisscalc.lib.operatorCache");
require("./../lib/swisscalc.lib.shuntingYard");
require("./../lib/swisscalc.display.numericDisplay.js");
require("./../lib/swisscalc.display.memoryDisplay.js");
require("./../lib/swisscalc.calc.calculator.js");

import React from 'react';
import { View,Text,StyleSheet, PanResponder,Dimensions } from 'react-native';
import { CalcButton, CalcDisplay} from './../Component';


export default class App extends React.Component{

    constructor(props){
        super(props);
    
        this.state= {
            display: '0',
            orientation: 'portait',
        };
    
        //Initialize calculator....
    
       this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new global.swisscalc.calc.calculator();


        // Initialize PanResponder......
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                if(Math.abs(gestureState.dx) >= 50) {
                    this.onBackspacePress();
                }
            },
        });
        
      }

      // When digit is pressed.....

      onDigitPress =(digit)=> {
          this.calc.addDigit(digit);
          this.setState({display: this.calc.getMainDisplay() });
      };

      //when binary operator is pressed..

      onBinaryOperatorPress = (operator) => {
          this.calc.addBinaryOperator(operator);
          this.setState({display: this.calc.getMainDisplay() });
      }

      onUniaryOperator = (operator) => {
          this.calc.addUnaryOperator(operator);
          this.setState({display: this.calc.getMainDisplay() });
      }

      // when clear button is pressed...
      onClearPress = ()=> {
          this.calc.clear();
          this.setState({display: this.calc.getMainDisplay() });
      }

      // when backspace is pressed....
      onBackspacePress = () => {
          this.calc.backspace();
          this.setState({display: this.calc.getMainDisplay() });
      }
      onPlusMinus = () => {
          this.calc.negate();
          this.setState({display: this.calc.getMainDisplay() });
      }
      onEqualPress = () => {
          this.calc.equalsPressed();
          this.setState({display: this.calc.getMainDisplay() });
      }

      renderPortait() {
          return(
              <View style= {{flex: 1}}>
            <View style = {styles.displayContainer} {...this.panResponder.panHandlers} >
            <CalcDisplay display = {this.state.display}/>
            </View>
           
           <View style = {styles.buttonContainer}>
           <View style = {styles.buttonRow}>
            <CalcButton onPress = {this.onClearPress}title = 'C' color = 'white' backgroundColor= "#B8A162"/>
            <CalcButton onPress = {this.onPlusMinus}title = '+/-' color = 'white' backgroundColor= "#B8A162"/>
            <CalcButton onPress = {()=> {this.onUniaryOperator(this.oc.PercentOperator)}}title = '%' color = 'white' backgroundColor= "#B8A162"/>
            <CalcButton onPress = {()=> {this.onBinaryOperatorPress(this.oc.DivisionOperator)}}title = '/' color = 'white' backgroundColor= "#934F3D"/>
            </View>

            <View style = {styles.buttonRow}>
            <CalcButton onPress = {()=> { this.onDigitPress("7")}}title = '7' color = 'white' backgroundColor= "#607D8B"/>
            <CalcButton onPress = {()=> { this.onDigitPress("8")}}title = '8' color = 'white' backgroundColor= "#607D8B"/>
            <CalcButton onPress = {()=> { this.onDigitPress("9")}}title = '9' color = 'white' backgroundColor= "#607D8B"/>
            <CalcButton onPress = {()=> {this.onBinaryOperatorPress(this.oc.MultiplicationOperator)}}title = '*' color = 'white' backgroundColor= "#934F3D"/>
            </View>

            <View style = {styles.buttonRow}>
            <CalcButton onPress = {()=> { this.onDigitPress("4")}}title = '4' color = 'white' backgroundColor= "#607D8B"/>
            <CalcButton onPress = {()=> { this.onDigitPress("5")}}title = '5' color = 'white' backgroundColor= "#607D8B"/>
            <CalcButton onPress = {()=> { this.onDigitPress("6")}}title = '6' color = 'white' backgroundColor= "#607D8B"/>
            <CalcButton onPress = {()=> {this.onBinaryOperatorPress(this.oc.SubtractionOperator)}}title = '-' color = 'white' backgroundColor= "#934F3D"/>
            </View>

            <View style = {styles.buttonRow}>
            <CalcButton onPress = {()=> { this.onDigitPress("1")}}title = '1' color = 'white' backgroundColor= "#607D8B"/>
            <CalcButton onPress = {()=> { this.onDigitPress("2")}}title = '2' color = 'white' backgroundColor= "#607D8B"/>
            <CalcButton onPress = {()=> { this.onDigitPress("3")}}title = '3' color = 'white' backgroundColor= "#607D8B"/>
            <CalcButton onPress = {()=> {this.onBinaryOperatorPress(this.oc.AdditionOperator)}}title = '+' color = 'white' backgroundColor= "#934F3D"/>
            </View>

            <View style = {styles.buttonRow}>
            <CalcButton onPress = {()=> { this.onDigitPress("0")}}title = '0' color = 'white' backgroundColor= "#607D8B" style = {{flex: 2}}/>
            <CalcButton onPress = {()=> { this.onDigitPress(".")}}title = '.' color = 'white' backgroundColor= "#607D8B"/>
            <CalcButton onPress = {this.onEqualPress}title = '=' color = 'white' backgroundColor= "#934F3D"/>
            </View>

           </View>
           </View>
          );
         
      }

    render(){
        return (
            <View style = {styles.container}>
               {this.renderPortait ()}
                
            </View>
            
            );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    displayContainer: {
        flex: 1,
        justifyContent: 'flex-end',

    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    buttonContainer: {
        paddingBottom: 10,
    }
})
