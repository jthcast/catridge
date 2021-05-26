// interface ColModel{
//   name: string;
//   isSortable: boolean;
//   type: `string` | `number`;
// }

export default class Grid{
  constructor({
    caption,
    className,
    colModels,
    colNames,
    data,
    noDataMessage = `There is no data`,
    target,
  }){
    this.$table = document.createElement(`table`);
    this.$thead = document.createElement(`thead`);
    this.$tbody = document.createElement(`tbody`);
    this.$table.classList.add(`grid`);
    this.caption = caption;
    this.className = className;
    this.colModels = colModels;
    this.colNames = colNames;
    this.data = data;
    this.noDataMessage = noDataMessage;

    this.createBody = () => {
      if(!this.data?.length){
        const $tr = document.createElement(`tr`);
        const $td = document.createElement(`td`);
        $td.colSpan = this.colNames.length;
        $td.innerText = this.noDataMessage;
        $tr.appendChild($td);
        this.$tbody.appendChild($tr);
  
        return;
      }
      if(this.data && this.colModels){
        this.data.forEach((row) => {
          const $tr = document.createElement(`tr`);
  
          this.colModels.forEach((model) => {
            const name = model[`name`];
  
            if(name){
              const $td = document.createElement(`td`);
              $td.innerText = row[name];
              $tr.appendChild($td);
            }
          });
  
          this.$tbody.appendChild($tr);
        });
      }
    };

    const sortHandling = (event) => {
      const $th = event.target.closest(`th`);
      const { issortable } = $th.dataset;

      if(issortable === `true`){
        this.sort($th);
      }
    };
    this.$thead.addEventListener(`click`, sortHandling);

    this.$table.appendChild(this.$thead);
    this.$table.appendChild(this.$tbody);
    target.appendChild(this.$table);
    this.render();
  }

  sort($clickedTh){
    const { name, sort, type } = $clickedTh.dataset;

    if(sort === `asc`){
      if(type === `number`){
        this.data.sort((a, b) => b[name] - a[name]);
      }else if(type === `string`){
        this.data.sort((a, b) => b[name] > a[name] ? 1 : b[name] < a[name] ? -1 : 0);
      }
      $clickedTh.setAttribute(`data-sort`, `desc`);
    }else{
      if(type === `number`){
        this.data.sort((a, b) => a[name] - b[name]);
      }else if(type === `string`){
        this.data.sort((a, b) => a[name] > b[name] ? 1 : a[name] < b[name] ? -1 : 0);
      }
      $clickedTh.setAttribute(`data-sort`, `asc`);
    }
    const $ths = this.$thead.childNodes[0].childNodes;
    $ths.forEach(($th) => {
      if($th !== $clickedTh){
        $th.removeAttribute(`data-sort`);
      }
    })
    
    this.$tbody.innerText = null;
    this.createBody();
  }
  
  render(){
    this.$thead.innerText = null;
    this.$tbody.innerText = null;

    if(this.caption){
      const $caption = document.createElement(`caption`);
      $caption.innerText = this.caption;

      this.$table.prepend($caption);
    }
    if(this.className){
      this.$table.classList.add(this.className);
    }
    if(this.colNames){
      const $tr = document.createElement(`tr`);

      this.colNames.forEach((colName, index) => {
        const $th = document.createElement(`th`);
        $th.innerText = colName;

        if(this.colModels){
          const model = this.colModels[index];
          for(let option in model){
            $th.setAttribute(`data-${option}`, model[option]);
          }
        }

        $tr.appendChild($th);
      });

      this.$thead.appendChild($tr);
    }
    this.createBody();
  }
}