import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableWithoutFeedback,FlatList} from 'react-native';

class StopWatchApp extends Component{
  constructor(props){
      super(props)
      this.props=props
      this.state={
        hour:0,
        minute:0,
        second:0,
        milisecond:0,
        stopwatchState:"start"
      }
      this.interval=null
      this.saveds=[]
      this.flatList = null
      this.available=true
  }

  start(){
    if(this.state.stopwatchState=="start"){
       this.interval=setInterval(()=>{
        if(this.state.milisecond==59){
           this.setState({milisecond:0})
           if(this.state.second==59){
            this.setState({second:0})
            if(this.state.minute==59){
            this.setState({minute:0})
            this.setState({hour:this.state.hour+1})
            }
            else
             this.setState({minute:this.state.minute+1})
         }
         else
           this.setState({second:this.state.second+1})
        }
        else
          this.setState({milisecond:this.state.milisecond+1})
       
        })
       this.setState({stopwatchState:"stop"})
    }
    
  }
  
  stop(){
    if(this.state.stopwatchState=="stop"){
       clearInterval(this.interval)
       this.setState({stopwatchState:"start"})
    }
  }
 
  save(){
     this.available=false
     this.saveds.push({h:this.state.hour,m:this.state.minute,s:this.state.second,ms:this.state.milisecond,key:this.saveds.length})
     this.available=true
    }


  renderItem(e){
     var i=e.index
     e=e.item
     return  <Text style={{fontSize:20}} key={e.k}>{i+1} - {this.fix(e.h)}:{this.fix(e.m)}:{this.fix(e.s)}:{this.fix(e.ms)}</Text>
  }

  reset(){
    this.setState({hour:0})
    this.setState({minute:0})
    this.setState({second:0})
    this.setState({milisecond:0})
  }

  toggleStopWatch(){
    if(this.available){
      if(this.state.stopwatchState=="start"){
        this.start()
      }
      else
        this.stop()
    }
  }


 fix = (number) => (number <= 9 ? `0${number}`: number);

 render(){
   return(
   <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",alignContent:"center"}}>
       
       <View style={{flexDirection:"row"}}>

        {this.state.hour >0 ?
         [
           <Text key="hour" style={{fontSize:30}}>{this.fix(this.state.hour)}</Text>,
           <Text key="column" style={{fontSize:30}}>:</Text>
          ]
        :null}

       <Text style={{fontSize:30}}>{this.fix(this.state.minute)}</Text>
       <Text style={{fontSize:30}}>:</Text>

       <Text style={{fontSize:30}}>{this.fix(this.state.second)}</Text>
       <Text style={{fontSize:30}}>:</Text>

       <Text style={{fontSize:30}}>{this.fix(this.state.milisecond)}</Text>

       </View>

       <View style={{flexDirection:"row"}}>

       {this.state.stopwatchState=="start"?
       <TouchableWithoutFeedback  onPress={this.save.bind(this)}>
         <Text style={{fontSize:30,alignSelf:"center",marginRight:20}}>save</Text>
       </TouchableWithoutFeedback>
       :null}

       <TouchableWithoutFeedback  onPress={this.toggleStopWatch.bind(this)}>
         <Text style={{fontSize:30,alignSelf:"center",marginRight:20,marginLeft:20}}>{this.state.stopwatchState}</Text>
       </TouchableWithoutFeedback>

       {this.state.stopwatchState=="start"?
       <TouchableWithoutFeedback  onPress={this.reset.bind(this)}>
         <Text style={{fontSize:30,alignSelf:"center",marginLeft:20}}>reset</Text>
       </TouchableWithoutFeedback>
       :null}

       </View>

       <View style={{flexDirection:"column",height:"30%",position:"absolute",bottom:100}}>
         {this.saveds.length>0? 
         <FlatList 
            onScrollAnimationEnd={false}
            ref={ref=>this.flatList=ref}
            onContentSizeChange={()=> this.flatList.scrollToEnd({animated: false})}
            showsHorizontalScrollIndicator={false} data={this.saveds}
            keyExtractor={item => item.key.toString()}
            renderItem={this.renderItem.bind(this)}
          />
         :null}
         </View>

       { this.props.children }
       
   </View>
   )
 }
}



export default StopWatchApp;
