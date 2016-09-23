import React from 'react';


const Contact = () => (
  <h3>Contact Us</h3>
)
//
// var ContactForm = React.createClass({
//   propTypes: {
//     value: React.PropTypes.object.isRequired,
//     onChange: React.PropTypes.func.isRequired,
// }

// React.createElement(ContactForm, {
//     value: this.props.newContact,
//     onChange: function(contact) { console.log(contact) },
// })

//
//   render: function() {
//     return (
//       React.createElement('form', {className: 'ContactForm'},
//         React.createElement('input', {
//           type: 'text',
//           placeholder: 'Name (required)',
//           value: this.props.value.name,
//         }),
//         React.createElement('input', {
//           type: 'email',
//           placeholder: 'Email',
//           value: this.props.value.email,
//         }),
//         React.createElement('textarea', {
//           placeholder: 'Description',
//           value: this.props.value.description,
//         }),
//         React.createElement('button', {type: 'submit'}, "Add Contact")
//       )
//     )
//   },
// });
//
export default Contact;
