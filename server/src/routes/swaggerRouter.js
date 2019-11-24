'use strict';

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const defaultUsers = require('../../default_users');
const config = require('../../config');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'OOTC API',
        version: '1.0.0',
        description: 'Out of the Cold Server API'
    },
    servers: [{
        url: 'http://{host}/api/{version}',
        description: 'dev',
        variables: {
            host: {
                default: config.SWAGGER_HOST
            },
            version: {
                enum: ['v1'],
                default: 'v1'
            }
        }
    }],    
    components: {
        securitySchemes: {
            basicAuth: {
                type: 'http',
                scheme: 'basic'
            }
        },
        schemas: {
            Department: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    description: { type: 'string'}
                }
            },
            UserNoId: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    fname: { type: 'string' },
                    mname: { type: 'string' },
                    lname: { type: 'string' },
                    phone: { type: 'integer' },
                    age: { type: 'integer' },
                    experience: { type: 'integer' },
                    comments: { type: 'string' }
                }
            },
            User: {
                allOf: [{ $ref: '#/components/schemas/UserNoId'}],
                properties: {
                    id: { type: 'string' }
                }
            },
            TimeSlotDefNoId: {
                type: 'object',
                properties: {
                    startTime: { type: 'string' },
                    duration: { type: 'integer' },
                    department: { type: 'integer' },
                    signUpCap: { type: 'integer' },
                    desc: { type: 'string' },
                    repeatStartDate: { type: 'string' },
                    repeatCount: { type: 'integer' },
                    repeatInterval: { type: 'integer' },
                    repeatSkipEvery: { type: 'integer' }
                }
            },
            TimeSlotDef: {
                allOf: [{ $ref: '#/components/schemas/TimeSlotDefNoId'}],
                properties: {
                    id: { type: 'integer' }
                }
            },
            ReservationNoId: {
                type: 'object',
                properties: {
                    user: { type: 'string' },
                    timeSlot: { type: 'integer' },
                    attended: { type: 'boolean' }
                }
            },
            Reservation: {
                allOf: [{ $ref: '#/components/schemas/ReservationNoId'}],
                properties: {
                    id: { type: 'integer' }
                }
            },
            TimeSlot: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    startDate: { type: 'string' },
                    startTime: { type: 'string' },
                    duration: { type: 'integer' },
                    department: { type: 'integer' },
                    signUpCap: { type: 'integer' },
                    desc: { type: 'string' }
                }
            },
        }
    },
    security: [
        { 
            basicAuth: []
        }
    ]
};

const options = {
    definition: swaggerDefinition,
    apis: ['src/routes/*Router.js'],
};

const swaggerUiExpressOptions = {
    swaggerOptions: {
        onComplete: function() {
            // lel this runs IN the browser and not on node HA
            // the lel hacks to push admin creds into the options object
            const creds = options.customOptions.creds;
            // we don't want to auth it, just make auto auth buttons

            function addExtraAuthButtons() {
                const authBtns = document.getElementsByClassName('auth-btn-wrapper')[0];
                authBtns.appendChild(makeAuthButton('admin'));
                authBtns.appendChild(makeAuthButton('user'));
            }

            function onAuthClick(authType) {
                if (creds[authType]) {
                    username = creds[authType].id;
                    pw = creds[authType].password;
                    ui.preauthorizeBasic("basicAuth", username, pw);
                    document.getElementsByClassName('close-modal')[0].click();
                }
            }

            function makeAuthButton(authType) {
                const btn = document.createElement("button"); 
                btn.classList.add('btn', 'modal-btn', 'auth', 'authorize', 'button');
                btn.innerText = `Auth ${authType}`;
                btn.type = 'button';
                btn.addEventListener('click', onAuthClick.bind(null, authType), false);
                return btn;
            }

            if (creds && Object.keys(creds).length > 0) {
                // open the auth panel
                const authorizeBtn = document.getElementsByClassName('btn','authorize')[0];
                authorizeBtn.addEventListener('click', function(){setTimeout(addExtraAuthButtons, 50);}, false);
                authorizeBtn.click();
            }
            else {
                // this console log is OK cuz it is on the swagger website
                console.log('No credentials were passed into swagger');
            }
        },
        creds: {
            admin: defaultUsers.admins[0],
            user: defaultUsers.users[0],
            superadmin: defaultUsers.superadmin[0]
        }
    },
    // explorer: true,
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    serve: swaggerUi.serve,
    doc: swaggerUi.setup(swaggerSpec, swaggerUiExpressOptions)
};
