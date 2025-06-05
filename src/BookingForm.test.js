import BookingForm from './components/BookingForm';
import { act } from "react";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { validateBookingForm } from "./components/BookingForm";

let cust;
let date;
let time;
let guests;
let occasion; 
let indoor;
let outdoor;
let divarea;
let btn;
let handleMockSubmit;
let handleDateChange;
let result;
let user;

describe("BookingForm", () => {

    const setup = () => {
        const times = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
        const bookingData = {
            customerName: "",
            date: "",
            time: "",
            guests: 0,
            occasion: "",
            area: ""
        }
        handleMockSubmit = jest.fn();
        handleDateChange = jest.fn();
        //user = userEvent.setup();
        render(<BookingForm bookingData={bookingData} availableTimes={times} 
            handleDateChange={handleDateChange} submitForm={handleMockSubmit}/>)

        cust = screen.getByLabelText(/Customer Name/);    
        date = screen.getByLabelText(/Choose date/);    
        time = screen.getByLabelText(/Choose time/);    
        guests = screen.getByLabelText(/Number of guests/);  
        occasion = screen.getByLabelText(/Occasion/);    
        indoor = screen.getByLabelText(/Indoor/);
        outdoor = screen.getByLabelText(/Outdoor/);  
        divarea = screen.getByLabelText(/Choose a seating area/);
        btn = screen.getByRole("button",{name: "submit"});         
    }

    test('Renders the BookingForm heading', () => {
        setup();
        const headingElement = screen.getByText("Reserve a table");
        expect(headingElement).toBeInTheDocument();
    })

    test('Checks BookingForm submit', async () => {
        const times = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
        const bookingData = {
            customerName: "Max Brown",
            date: "2024-06-22",
            time: "18:00",
            guests: 5,
            occasion: "Birthday",
            area: "Indoor"
        }
        handleMockSubmit = jest.fn();
        handleDateChange = jest.fn();
        render(<BookingForm bookingData={bookingData} availableTimes={times} 
            handleDateChange={handleDateChange} submitForm={handleMockSubmit}/>)
        btn = screen.getByRole("button",{name: "submit"});  
        fireEvent.click(btn);
        await waitFor(() => {
            expect(btn).toBeEnabled();
            expect(handleMockSubmit).toHaveBeenCalledWith({
                customerName: "Max Brown",
                date: "2024-06-22",
                time: "18:00",
                guests: 5,
                occasion: "Birthday",
                area: "Indoor"
            });
        })
    })

    test('Checks BookingForm submit button enabled', async () => {
        const times = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
        const bookingData = {
            customerName: "Max Brown",
            date: "2024-06-22",
            time: "18:00",
            guests: 5,
            occasion: "Birthday",
            area: ""
        }
        handleMockSubmit = jest.fn();
        handleDateChange = jest.fn();
        render(<BookingForm bookingData={bookingData} availableTimes={times} 
            handleDateChange={handleDateChange} submitForm={handleMockSubmit}/>)
        btn = screen.getByRole("button",{name: "submit"});  
        userEvent.type(screen.getByRole("radio", { name: "Indoor"}));
        //fireEvent.click(screen.getByRole("radio", { name: "Indoor"}));
        fireEvent.click(btn);
        await waitFor(() => {
            expect(btn).toBeEnabled();
            expect(handleMockSubmit).toHaveBeenCalledWith({
                customerName: "Max Brown",
                date: "2024-06-22",
                time: "18:00",
                guests: 5,
                occasion: "Birthday",
                area: "Indoor"
            });
        })
    })

    test('Customer name input field is required', async () => {
        setup();        
        
        act(() => {
            fireEvent.change(cust, {target: {value: ""}});    
            fireEvent.blur(cust);     
            fireEvent.change(date, {target: {value: "06/19/2024"}});  
            fireEvent.change(time, {target: {value: "18:00"}});  
            fireEvent.change(guests, {target: {value: "5"}});  
            fireEvent.change(occasion, {target: {value: "Birthday"}});  
            fireEvent.click(indoor);  
            fireEvent.click(btn);    
        });
        
        
        await waitFor(() => {
            expect(screen.getByTestId("custNameError")).not.toBe(null);
            expect(screen.getByTestId("custNameError")).toHaveTextContent("Customer name is required. Please provide a valid name");
            expect(btn).toHaveAttribute("disabled"); 
          });
           
    })

    test('Customer name input field should be minimum 8 chars', async () => {
        setup();        
        
        act(() => {
            fireEvent.change(cust, {target: {value: "abcdef"}});    
            fireEvent.blur(cust);     
            fireEvent.change(date, {target: {value: "06/19/2024"}});  
            fireEvent.change(time, {target: {value: "18:00"}});  
            fireEvent.change(guests, {target: {value: "5"}});  
            fireEvent.change(occasion, {target: {value: "Birthday"}});  
            fireEvent.click(indoor);  
            fireEvent.click(btn);    
        });
        
        
        await waitFor(() => {
            expect(screen.getByTestId("custNameError")).not.toBe(null);
            expect(screen.getByTestId("custNameError")).toHaveTextContent("Please enter at least 8 characters!");
            expect(btn).toHaveAttribute("disabled"); 
          });
           
    })

    test('Customer name input field should be max 50 chars', async () => {
        setup();        
        
        act(() => {
            fireEvent.change(cust, {target: {value: "addaadfaggsafgasfasdfasfdasfsafasdfasdfasdfasdfasdfasdfasdfsadfsadfasdfsadfsafasfasfasdfsfasfas"}});    
            fireEvent.blur(cust);     
            fireEvent.change(date, {target: {value: "06/19/2024"}});  
            fireEvent.change(time, {target: {value: "18:00"}});  
            fireEvent.change(guests, {target: {value: "5"}});  
            fireEvent.change(occasion, {target: {value: "Birthday"}});  
            fireEvent.click(indoor);  
            fireEvent.click(btn);    
        });
        
        
        await waitFor(() => {
            expect(screen.getByTestId("custNameError")).not.toBe(null);
            expect(screen.getByTestId("custNameError")).toHaveTextContent("Please enter maximun 50 characters!");
            expect(btn).toHaveAttribute("disabled"); 
          });
           
    })

    test('Date input field should be have value greater than or equal to today', async () => {
        setup();        
        
        act(() => {
            fireEvent.change(cust, {target: {value: "Max Brown"}});    
            fireEvent.blur(cust);     
            fireEvent.change(date, {target: {value: "2024-06-11"}}); 
            fireEvent.blur(date); 
            fireEvent.change(time, {target: {value: "18:00"}});
            fireEvent.blur(time);  
            fireEvent.change(guests, {target: {value: "5"}});  
            fireEvent.blur(guests); 
            fireEvent.change(occasion, {target: {value: "Birthday"}});  
            fireEvent.blur(occasion); 
            fireEvent.click(indoor);  
            fireEvent.click(btn);    
        });
        
        
        await waitFor(() => {
            expect(screen.getByTestId("dateError")).not.toBe(null);
            expect(screen.getByTestId("dateError")).toHaveTextContent("Please select any date starting from today");
            expect(btn).toHaveAttribute("disabled"); 
          });
           
    })

    test('Date input field is required', async () => {
        setup();        
        
        act(() => {
            fireEvent.change(cust, {target: {value: "Max Brown"}});    
            fireEvent.blur(cust);     
            fireEvent.change(date, {target: {value: ""}}); 
            fireEvent.blur(date); 
            fireEvent.change(time, {target: {value: "18:00"}});
            fireEvent.blur(time);  
            fireEvent.change(guests, {target: {value: "5"}});  
            fireEvent.blur(guests); 
            fireEvent.change(occasion, {target: {value: "Birthday"}});  
            fireEvent.blur(occasion); 
            fireEvent.click(indoor);  
            fireEvent.click(btn);    
        });
        
        
        await waitFor(() => {
            expect(screen.getByTestId("dateError")).not.toBe(null);
            expect(screen.getByTestId("dateError")).toHaveTextContent("Date is required. Please select a valid date starting from today");
            expect(btn).toHaveAttribute("disabled"); 
          });
           
    })

    test('Time input field is required', async () => {
        setup();        
        
        act(() => {
            fireEvent.change(cust, {target: {value: "Max Brown"}});    
            fireEvent.blur(cust);     
            fireEvent.change(date, {target: {value: "2024-06-21"}}); 
            fireEvent.blur(date); 
            fireEvent.change(time, {target: {value: ""}});
            fireEvent.blur(time);  
            fireEvent.change(guests, {target: {value: "5"}});  
            fireEvent.blur(guests); 
            fireEvent.change(occasion, {target: {value: "Birthday"}});  
            fireEvent.blur(occasion); 
            fireEvent.click(indoor);  
            fireEvent.click(btn);    
        });
        
        
        await waitFor(() => {
            expect(screen.getByTestId("timeError")).not.toBe(null);
            expect(screen.getByTestId("timeError")).toHaveTextContent("Time is required. Please select a valid time");
            expect(btn).toHaveAttribute("disabled"); 
          });
           
    })    

    test('Number of guests input field is required', async () => {
        setup();        
        
        act(() => {
            fireEvent.change(cust, {target: {value: "Max Brown"}});    
            fireEvent.blur(cust);     
            fireEvent.change(date, {target: {value: "2024-06-21"}}); 
            fireEvent.blur(date); 
            fireEvent.change(time, {target: {value: "18:00"}});
            fireEvent.blur(time);  
            fireEvent.change(guests, {target: {value: ""}});  
            fireEvent.blur(guests); 
            fireEvent.change(occasion, {target: {value: "Birthday"}});  
            fireEvent.blur(occasion); 
            fireEvent.click(indoor);  
            fireEvent.click(btn);    
        });
        
        
        await waitFor(() => {
            expect(screen.getByTestId("guestsError")).not.toBe(null);
            expect(screen.getByTestId("guestsError")).toHaveTextContent("Number of guests is required. Please enter a valid number");
            expect(btn).toHaveAttribute("disabled"); 
          });
           
    })

    test('Number of guests cannot be less than 1', async () => {
        setup();        
        
        act(() => {
            fireEvent.change(cust, {target: {value: "Max Brown"}});    
            fireEvent.blur(cust);     
            fireEvent.change(date, {target: {value: "2024-06-21"}}); 
            fireEvent.blur(date); 
            fireEvent.change(time, {target: {value: "18:00"}});
            fireEvent.blur(time);  
            fireEvent.change(guests, {target: {value: 0}});  
            fireEvent.blur(guests); 
            fireEvent.change(occasion, {target: {value: "Birthday"}});  
            fireEvent.blur(occasion); 
            fireEvent.click(indoor);  
            fireEvent.click(btn);    
        });
        
        
        await waitFor(() => {
            expect(screen.getByTestId("guestsError")).not.toBe(null);
            expect(screen.getByTestId("guestsError")).toHaveTextContent("Please select a number greater than 0");
            expect(btn).toHaveAttribute("disabled"); 
          });
           
    })

    test('Number of guests cannot be greater than 20', async () => {
        setup();        
        
        act(() => {
            fireEvent.change(cust, {target: {value: "Max Brown"}});    
            fireEvent.blur(cust);     
            fireEvent.change(date, {target: {value: "2024-06-21"}}); 
            fireEvent.blur(date); 
            fireEvent.change(time, {target: {value: "18:00"}});
            fireEvent.blur(time);  
            fireEvent.change(guests, {target: {value: 30}});  
            fireEvent.blur(guests); 
            fireEvent.change(occasion, {target: {value: "Birthday"}});  
            fireEvent.blur(occasion); 
            fireEvent.click(indoor);  
            fireEvent.click(btn);    
        });
        
        
        await waitFor(() => {
            expect(screen.getByTestId("guestsError")).not.toBe(null);
            expect(screen.getByTestId("guestsError")).toHaveTextContent("Please enter a maximum of 20 guests");
            expect(btn).toHaveAttribute("disabled"); 
          });
           
    })

    test('Occasion is a required field', async () => {
        setup();        
        
        act(() => {
            fireEvent.change(cust, {target: {value: "Max Brown"}});    
            fireEvent.blur(cust);     
            fireEvent.change(date, {target: {value: "2024-06-21"}}); 
            fireEvent.blur(date); 
            fireEvent.change(time, {target: {value: "18:00"}});
            fireEvent.blur(time);  
            fireEvent.change(guests, {target: {value: 15}});  
            fireEvent.blur(guests); 
            fireEvent.change(occasion, {target: {value: ""}});  
            fireEvent.blur(occasion); 
            fireEvent.click(indoor);  
            fireEvent.click(btn);    
        });
        
        
        await waitFor(() => {
            expect(screen.getByTestId("occasionError")).not.toBe(null);
            expect(screen.getByTestId("occasionError")).toHaveTextContent("Occasion is required. Please select a valid occasion");
            expect(btn).toHaveAttribute("disabled"); 
          });
           
    })

    test('Seating area is required', async () => {
        setup();        
        
        act(() => {
            fireEvent.change(cust, {target: {value: "Max Brown"}});    
            fireEvent.blur(cust);     
            fireEvent.change(date, {target: {value: "2024-06-21"}}); 
            fireEvent.blur(date); 
            fireEvent.change(time, {target: {value: "18:00"}});
            fireEvent.blur(time);  
            fireEvent.change(guests, {target: {value: 15}});  
            fireEvent.blur(guests); 
            fireEvent.change(occasion, {target: {value: "Birthday"}});  
            fireEvent.click(screen.getByTestId('area'));
            //result.getByTestId('area').simulate('click'); 
            fireEvent.click(btn);    
        });
        
        
        await waitFor(() => {
            expect(screen.getByTestId("areaError")).not.toBe(null);
            expect(screen.getByTestId("areaError")).toHaveTextContent("Seating area is required. Please select an option");
            expect(btn).toHaveAttribute("disabled"); 
          });
           
    })

    test('Test validateBookingForm function with valid data', async () => {
        const bookingData = {
            customerName: "Max Brown",
            date: "2024-06-22",
            time: "18:00",
            guests: 5,
            occasion: "Birthday",
            area: "Indoor"
        }
        expect(validateBookingForm(bookingData)).toEqual({});
    })
    
    test('Test validateBookingForm function with invalid data', async () => {
        const bookingData = {
            customerName: "Max Br",
            date: "2024-06-12",
            time: "",
            guests: 0,
            occasion: "",
            area: ""
        }
        expect(validateBookingForm(bookingData)).not.toEqual({});
        expect(validateBookingForm(bookingData)).toEqual({
            customerName: "Please enter at least 8 characters!",
            date: "Please select any date starting from today",
            time: "Time is required. Please select a valid time",
            guests: "Please select a number greater than 0",
            occasion: "Occasion is required. Please select a valid occasion",
            area: "Seating area is required. Please select an option"
        });
    })
    
    
})