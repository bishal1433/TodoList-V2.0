//jshint esversion:6

const express=require(`express`);
const bodyParser=require(`body-parser`);
const mongoose=require(`mongoose`);
const date=require(__dirname+"/date.js");

const app=express();

//connecting and creating a database
mongoose.connect("mongodb+srv://bishal:test123@cluster0.hzop7f6.mongodb.net/todoList",{useNewURLParser:true});


app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');


//creating item Schema

const itemSchema = new mongoose.Schema({
  name:String
});

//creating a mongoose model
const Item = mongoose.model("item",itemSchema);

//making a collection element
const item1= new Item({
  name:"Welcome to Todolist App"
});

const item2 = new Item({
  name:"Hit in check box, when work is done"
});

const defaultItems=[item1,item2];







app.get(`/`,function(req,res){
  var day=date.getdate();

  //find the coolections from database...
   Item.find({},function(err,foundItems){
     if(err){
       console.log(err);
     }
     else{
       //if foundItems length is null then insert default values else render them to App
       if(foundItems.length === 0){
         //inserting items in our Item collection
         Item.insertMany(defaultItems,function(err){
           if(err){
             console.log(err);
           }
           else{
             console.log("Successfully inserted items");
           }
         });
         res.redirect("/");
       }
       else{
         res.render("list",{kindOfDay:day,newListitem:foundItems});
       }
     }
   });


});




//for post request
app.post(`/`,function(req,res){
  console.log(req.body);
  const itemName=req.body.newItem;

  const item= new Item({
    name:itemName
  });

  item.save();
  res.redirect("/");
});

//when user Requesting for delete an item from listen

app.post(`/delete`,function(req,res){
  const id = req.body.deleter;

  Item.findByIdAndRemove(id,function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("Successfully Deleted Item.");
          res.redirect("/");
        }
  });
});


//building server
let port = process.env.PORT;
app.listen(port||3000,function(){
  console.log(`your server is up at port 3000`);
});

//password: nojxeXl0Y9HZoLEw
