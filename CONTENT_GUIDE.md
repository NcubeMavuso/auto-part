# AutoParts Pro - Content Management Guide

This guide will help you replace placeholder content with your actual business information.

## 🔧 **Content to Replace**

### **1. Business Information**
Replace these placeholders with your actual business details:

#### **Contact Information**
- **Phone**: `+1 (555) 123-4567` → Your actual phone number
- **Email**: `info@autopartspro.com` → Your actual email
- **Address**: `123 Auto Street, Parts City, PC 12345` → Your actual address

#### **Social Media Links**
- **WhatsApp**: `https://wa.me/1234567890` → Your actual WhatsApp number
- **TikTok**: `https://tiktok.com/@yourusername` → Your actual TikTok username
- **Facebook**: `https://facebook.com/yourpage` → Your actual Facebook page

### **2. Files to Update**

#### **All HTML Files** (index.html, admin.html, contact.html, payment-info.html, cart.html, product.html, privacy-policy.html, terms-of-service.html, shipping-returns.html)

Search and replace:
```html
<!-- Replace these in ALL files -->
+1 (555) 123-4567 → Your Phone Number
info@autopartspro.com → Your Email
123 Auto Street, Parts City → Your Address
https://wa.me/1234567890 → Your WhatsApp Link
https://tiktok.com/@yourusername → Your TikTok Link
https://facebook.com/yourpage → Your Facebook Link
```

### **3. Business Name**
If you want to change "AutoParts Pro" to your business name:

1. **Search and replace** in all HTML files:
   - `AutoParts Pro` → `Your Business Name`

2. **Update the logo** in the header:
   ```html
   <h1><i class="fas fa-car"></i> Your Business Name</h1>
   ```

### **4. Product Information**

#### **In script.js**
Update the sample products with your actual products:

```javascript
const products = [
    {
        id: 1,
        title: "Your Product Name",
        description: "Your product description",
        price: 99.99,
        category: "engine", // or appropriate category
        image: "images/products/your-image.jpg",
        fallbackIcon: "fas fa-car-parts",
        options: [
            { name: "Size", values: ["Small", "Medium", "Large"] }
        ],
        inStock: true
    }
    // Add more products...
];
```

#### **Categories**
Update categories in script.js:
```javascript
const categories = {
    'all': 'All Products',
    'engine': 'Engine Parts',
    'brakes': 'Brake System',
    // Add your categories...
};
```

### **5. About Section Content**
In index.html, update the About section:
```html
<p>Your actual business description here...</p>
```

### **6. Legal Pages**
Update these files with your actual business information:
- `privacy-policy.html`
- `terms-of-service.html` 
- `shipping-returns.html`

## 📸 **Adding Product Images**

### **1. Create Images Folder Structure**
```
images/
└── products/
    ├── air-filter.jpg
    ├── brake-pads.jpg
    ├── coilovers.jpg
    ├── exhaust.jpg
    ├── led-lights.jpg
    └── steering-wheel.jpg
```

### **2. Image Requirements**
- **Format**: JPG or PNG
- **Size**: 400x300 pixels minimum
- **File Size**: Under 500KB
- **Quality**: Clear, well-lit product photos

### **3. Fallback Icons**
If images are missing, the system will show FontAwesome icons. You can customize these in the product data.

## 🎨 **Customizing Design**

### **Colors**
In `styles.css`, you can change the main colors:
```css
/* Primary colors */
--primary-color: #1e3c72; /* Main blue */
--secondary-color: #2a5298; /* Secondary blue */
--accent-color: #ffd700; /* Gold accent */
```

### **Fonts**
The site uses system fonts for better performance. To change:
```css
body {
    font-family: 'Your Font', sans-serif;
}
```

## 🚀 **Quick Setup Checklist**

- [ ] Replace phone number in all files
- [ ] Replace email address in all files
- [ ] Replace business address in all files
- [ ] Update social media links
- [ ] Add your product images to `images/products/`
- [ ] Update product data in `script.js`
- [ ] Customize About section content
- [ ] Review and update legal pages
- [ ] Test all functionality
- [ ] Update admin panel with your products

## 📞 **Support**

If you need help customizing the website, refer to the main README.md file or contact support.

---

**Remember**: Always backup your files before making changes!

