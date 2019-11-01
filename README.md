# **WeChat Miniprogram Automator Extension**

Miniprogram Automator extension package is an extension version of the miniprogram-automator package which developed by the WeChat miniprogram team. The miniprogram automator extension is a new approach to find and perform an action on the element. I want to simplified the functionalities so it may help the user write effortless end 2 end test scenarios. 


The following funtion are exposed on the page level (ExtendedPage) so the user can directly trigger actions on the page without calling *page.$('.selector')*. 

- **tap**: Tap on the elem,ent
- **text**: Get the text of the element
- **wxml**: Get this inner xml(html)
- **outerWxml**: Get outer cml(html)
- **attribute**: Get the attribute value of the element
- **trigger**: Trigger the element event such as focus, change
- **type**: Type in the input element, newly added
- **value**: Get the value of the input element
- **style**: Get the value of the Sytle attribute
- **waitFor**: Wait for specific time
- **waitFor**: Wait for the selector to be appeared
- **waitUntil**: Wait until specific parameter value not matched
- **waitUntilTextMatch**: Wait until specific text not appeared
- **waitUntilAttributeValueMatch**: Wait until attribute value match
- **waitUntilWxmlMatch**: wait until wxml not match
- **findElementByText**: Get the element if specific text matched
- **findByIndex**: Get the element by index
- and all rest of page function

 <img src="./mini-auto-ext.png" width="700px" height="500px"/>
 
 *You can refer *.d.ts files for more details**

## **How does it works**
**Miniprogram Automator Extenstion** library working pattern is slight different than **Miniprogram Automator**. Let's undertand this by tapping on the button element


### **Miniprogram-automator**
Find the element by calling **page.$('.selector')** and then trigger action of that element.  

This is a good approch if you trigger multiple action on the element

```
    page = await miniProgram.navigateTo('Home');
    const btnElement = await page.$('.btn_element");
    await btnElement.tap();
```

### **Miniprogram-automator-extension**
The element selector can be passed directly in the action function. The function execute two actions together
- Find an element and 
- Trigger the action on the element 

This approch is useful when you want to trigger a single action on the element.

```
    const page = await miniProgram.navigateTo('Home');
    await page.tap('.btn_element); 
```

