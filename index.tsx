import React, {FC, useState, ReactElement} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';

export interface StepperProps {
  active: number;
  content: ReactElement[];
  onNext: Function;
  onBack: Function;
  onFinish: Function;
  wrapperStyle?: ViewStyle;
  stepStyle?: ViewStyle;
  stepTextStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  showButton?: boolean;
  nextLabel:string;
  backLabel:string;
  finishLabel:string
  showButtonBack?:boolean
  showButtonNext?:boolean;
}

const search = (keyName: number, myArray: number[]): boolean => {
  let value = false;
  myArray.map((val) => {
    if (val === keyName) {
      value = true;
    }
  });
  return value;
};

const Stepper: FC<StepperProps> = (props) => {
  const {
    active,
    content,
    onBack,
    onNext,
    onFinish,
    wrapperStyle,
    stepStyle,
    stepTextStyle,
    buttonStyle,
    showButton = true,
    buttonTextStyle,
    showButtonBack = true,
    showButtonNext = true,
    nextLabel = "Next",
    backLabel = "Back",
    finishLabel= "Finish"
  } = props;
  const [step, setStep] = useState<number[]>([0]);
  const pushData = (val: number) => {
    setStep((prev) => [...prev, val]);
  };

  const removeData = () => {
    setStep((prev) => {
      prev.pop();
      return prev;
    });
  };
  return (
    <View style={wrapperStyle}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {content.map((_, i) => {
          return (
            <React.Fragment key={i}>
              {i !== 0 && (
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: 'grey',
                    opacity: 1,
                    marginHorizontal: 10,
                  }}
                />
              )}
              <View
                style={[
                  {
                    backgroundColor: '#1976d2',
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: search(i, step) ? 1 : 0.3,
                  },
                  stepStyle,
                ]}>
                {search(i, step) ? (
                  <Text
                    style={[
                      {
                        color: 'white',
                      },
                      stepTextStyle,
                    ]}>
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={[
                      {
                        color: 'white',
                      },
                      stepTextStyle,
                    ]}>
                    {i + 1}
                  </Text>
                )}
              </View>
            </React.Fragment>
          );
        })}
      </View>
        {content[active]}
      {showButton && (
        <View
          style={{
            flexDirection: 'row', marginTop:"5%",marginBottom:"2%",
            justifyContent:showButtonBack === false  ? "flex-end":"space-between",paddingHorizontal:"5%"
          }}>
          {(showButtonBack) && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  alignSelf: 'flex-start',
                 
                },
                buttonStyle,
              ]}
              onPress={() => {
                removeData();
                onBack();
              }}>
              <Text style={[{color: 'white'}, buttonTextStyle]}>{backLabel}</Text>
            </TouchableOpacity>
          )}
          {content.length - 1 !== active && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
               
                  
                  alignSelf: 'flex-end',
               
                },
                buttonStyle,
              ]}
              onPress={() => {
                pushData(active + 1);
                onNext();
              }}>
              <Text style={[{color: 'white'}, buttonTextStyle]}>{nextLabel}</Text>
            </TouchableOpacity>
          )}
          {content.length - 1 === active && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: '#1976d2',
                  alignSelf: 'flex-start',
                },
                buttonStyle,
              ]}
              onPress={() => onFinish()}>
              <Text style={[{color: 'white'}, buttonTextStyle]}>{finishLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default Stepper;