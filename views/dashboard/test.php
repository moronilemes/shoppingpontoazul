<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

echo \kato\DropZone::widget([
       'options' => [
           'maxFilesize' => '2',
           'acceptedFiles' => 'image/*',
           'url' => '/product/upload',
           'addRemoveLinks' => true,
           'maxFiles' => 6,
           'dictDefaultMessage' => 'Clique ou arraste as imagens aqui',
           'dictMaxFilesExceeded' => 'Você atingiu o limite de imagens para upload',
           'dictRemoveFile' => 'Remover imagem',
           'dictCancelUpload' => 'Calcelar upload',
           'dictFileTooBig' => 'Imagem muito grande para este upload',
       ],
       'clientEvents' => [
           'complete' => "function(file){console.log(file)}",
           'removedfile' => "function(file){alert(file.name + ' is removed')}"
       ],
   ]);

?>