/**
 * Light Sensors
 */
//% weight=10 color=#9F79EE icon="\uf108" block="XinaBox"
namespace SL01 {
	// PCA9536 Device I2C Address
	const TSL4531_I2C_ADDRESS   = 0x29  

	// Defines TSL4531 Registers
	const TSL4531_REG_CONTROL 	=	0x00	
	const TSL4531_REG_CONF		  =	0x01	
	const TSL4531_REG_DATA_LOW	=	0x04	
	const TSL4531_REG_DATA_HIGH	=	0x05

	// Defines TSL4531
	const TSL4531_WRITE_CMD		  =	0x80	
	const TSL4531_CONF_PWR_DOWN =	0x00
	const TSL4531_CONF_ONE_RUN 	=	0x02	
	const TSL4531_CONF_START 	  =	0x03	

	const TSL4531_CONF_IT_100	=	0x02	
	const TSL4531_CONF_IT_200	=	0x01	
	const TSL4531_CONF_IT_400	=	0x00	

	const TSL4531_CONF_PSAVE 	=	0x08


  /**
  * Writes a value over I2C
  * @param addr the I2C address
  * @param reg the register to address
  * @param value the value to write to registers
  */
  function i2cwrite(addr: number, reg: number, val: number) {
    pins.i2cWriteNumber(TSL4531_I2C_ADDRESS, reg << 8 | val, NumberFormat.Int16BE)
  }

  /**
  * Reads a value over I2C
  * @param addr the I2C address
  * @param reg the register to address
  */
  function i2cread(reg: number, format: NumberFormat) {
    pins.i2cWriteNumber(TSL4531_I2C_ADDRESS, reg, NumberFormat.UInt8BE, false)
    let val = pins.i2cReadNumber(addr, format, false)
    return val
  }

  /**
  * Initialize the sensors
  */
  //% blockId=XinaBox_Init_Light_Sensor block="Start SL01"
  export function initTSL4531(): void {
    i2cwrite((TSL4531_WRITE_CMD | TSL4531_REG_CONTROL), TSL4531_CONF_START)
    i2cwrite((TSL4531_WRITE_CMD | TSL4531_REG_CONF), (TSL4531_CONF_IT_100 | TSL4531_CONF_PSAVE))
  }      

  /**
  * Read the Ambient light level in LUX
  */  
  //% blockId=XinaBox_AmbientLight_Lux block="Light Sensor (LUX)"
  export function LUX(): number {
    let byteH = i2cread((TSL4531_WRITE_CMD | TSL4531_REG_DATA_HIGH))
    let byteL = i2cread((TSL4531_WRITE_CMD | TSL4531_REG_DATA_LOW))
    let lux = 4*((byteH * 256) + byteL)
    return lux
  }    

}
