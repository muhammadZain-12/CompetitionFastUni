import DropDownPicker from "react-native-dropdown-picker"




{/* <DropDown open={open} value={value} items={items} setOpen={setOpen} setValue={setValue} setItems={setItems}  /> */}

// const [myArray, setMyArray] = React.useState([]);
// const [open, setOpen] = React.useState(false);
// const [value, setValue] = React.useState(null);
// const [items, setItems] = React.useState([
//   {label: 'Apple', value: 'apple'},
//   {label: 'Banana', value: 'banana'},
//   {label: 'Orange', value: 'orange'},
//   {label: 'Lemon', value: 'lemon'},
//   {label: 'Pomegranate', value: 'pomegranate'},
// ]);

function DropDown (Prop) {
    const {open,value,items,setOpen,setValue,setItems} = Prop
    return (
        <DropDownPicker
              
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              containerStyle={{position: 'relative', width: '70%', left: '15%', paddingTop: 10}}
              style={{
                backgroundColor: '#fafafa',
                zIndex: 10,
                position: 'relative',
              }}
              itemStyle={{justifyContent: 'flex-start'}}
              dropDownStyle={{backgroundColor: '#fafafa', height: 100}}
              dropDownContainerStyle={{
                backgroundColor: 'white',
                zIndex: 2,
                elevation: 5000,
              }}
            />
    )
}

export default DropDown