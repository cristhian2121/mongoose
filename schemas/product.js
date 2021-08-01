const mongoose =  require('mongoose')
const slugify = require('slugify')
const validator = require('validator')

// Validators
const isEmail = validator.isEmail


// Defined schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [5, 'Name shout will greater than 5 characterics'],
        maxlength: 128,
    },
    branch: {
        type: String,
        match: /\b[^\We]+\b/
    },
    price: {
        type: Number,
        validate: {
            validator: function(value) {
                if(value > 1000) return false
                return true
            },
            message: (props) => `No is posible save this ${props.value} because is greater than 1000`
        }
    },
    discount: Number,
    status: {
        type: String,
        enum: ['good', 'bad']
    },
    creator: {
        type: String,
        validate: [isEmail, 'Creator is not email'],
    },
    created: {
        type: Date,
        default: new Date()
    },
    modified: Date,
    slug: {
        type: String,
        require: true,
    },
    sellers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seller',
        }
    ]
})

// Create virtual
productSchema.virtual('info')
    .get(function(){
        return this.name + this.price
    })
    .set(function(value){
        console.log('I dont know how I can use that ', value);
    })


/**
 * Do anything before to ->
 * validate
 * save
 * remove
 * updateOne
 * deleteOne
 * init
 */
productSchema.post('remove', function(next){
    // next('Error')
    console.log('Remove success');
    next()
})
productSchema.pre('validate', function(next) {
    this.slug = slugify(this.name)
    next()
})

// defined model
mongoose.model('Product', productSchema)

// exports.productSchema = productSchema